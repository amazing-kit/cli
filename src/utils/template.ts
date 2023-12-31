import fs from "fs"
import handlebars from "handlebars"
import yaml from "js-yaml"
import path from "path"
import colors from "picocolors"
import { partition } from "rambda"
import { globby } from "zx"
import { __dirname, execute_shell } from "./node"
import { extract_project_info, ProjectInfo } from "./project"


export type GenerateProjectConfiguration<Options> = {
  full_name: string
  template: string
  options?: Options
  pnpm?: {
    install?: boolean
    add_to_workspace?: boolean
  },
  next?: (project_info: ProjectInfo, options?: Options) => Promise<void> | void
}

export const generate_project = async (config: GenerateProjectConfiguration<any>) => {
  const {
    full_name,
    template,
    options,
    pnpm,
    next
  } = config

  console.log(`create ${template} ${colors.green(full_name)}...`)

  const project_info = await extract_project_info(full_name)

  await generate_from_template_folder({
    template_relative_folder_path: template,
    target_project_folder_path: project_info.relative_path,
    is_monorepo: project_info.is_in_mono_repo,
    data: {
      ...project_info,
      options
    }
  })

  if (pnpm?.add_to_workspace && project_info.is_in_mono_repo) {
    const workspace_config_path = path.join(project_info.monorepo.relative_path, "pnpm-workspace.yaml")
    const workspace_config = yaml.load(fs.readFileSync(workspace_config_path, "utf-8")) as {
      packages: string[]
    }

    const workspace_project_path = `./packages/${project_info.name}`

    if (workspace_config.packages === null) {
      workspace_config.packages = []
    }

    if (!workspace_config.packages.includes(workspace_project_path)) {
      workspace_config.packages.push(workspace_project_path);

      // Sauvegarde les modifications
      const newYaml = yaml.dump(workspace_config);
      fs.writeFileSync(workspace_config_path, newYaml, "utf8");

      console.log(colors.green("added to workspace"))
    }
  }

  if (pnpm?.install) {
    await execute_shell(`cd ${project_info.relative_path} && pnpm install`)

    console.log(colors.green("dependencies installed"))
  }

  if (next !== undefined) {
    await next(project_info, options)
  }

  console.log(`${template} ${colors.green(full_name)} created`)
  console.log("")
}

export const generate_from_template_folder = async (params: GenerateFromTemplateFolderParams) => {
  const {
    template_relative_folder_path,
    target_project_folder_path,
    is_monorepo,
    data
  } = params
  const template_folder_path = path.join(__dirname, `../templates/${template_relative_folder_path}`)

  // find all template files
  const all_template_paths = await globby(
    [
      `${template_folder_path}/**/*`
    ],
    {
      ignore: [
        ...!is_monorepo ? [`${template_folder_path}/**/*.monorepo`] : [],
        ...is_monorepo ? [`${template_folder_path}/**/*.single`] : [],
      ],
      onlyFiles: false,
      onlyDirectories: false,
      dot: true
    }
  )

  const all_template_elements = await Promise.all(
    all_template_paths.map(async (file_path) => {
      const is_folder = fs.lstatSync(file_path).isDirectory()
      const relative_file_path = path.relative(template_folder_path, file_path)

      return {
        file_path,
        is_folder
      }
    })
  )

  const [ all_template_file_paths, all_template_folder_paths ] = partition(
    (template_path) => fs.lstatSync(template_path).isFile(),
    all_template_paths
  )

  // create folders
  all_template_folder_paths.forEach(folder_path => {
    const relative_folder_path = path.relative(template_folder_path, folder_path)
    const target_folder_path = path.join(target_project_folder_path, relative_folder_path)

    fs.mkdirSync(target_folder_path, { recursive: true })
  })
  console.log(`${colors.green(all_template_folder_paths.length)} folders created`)

  // get template path and other files to copy
  // TODO:

  // compile templates
  const compiled_templates = all_template_file_paths.map(file_path => {
    if (!is_template_file(file_path)) {
      return {
        file_path,
        template: (data: any) => fs.readFileSync(file_path, 'utf-8')
      }
    }

    const template_content = fs.readFileSync(file_path, 'utf-8')
    const template =  handlebars.compile(template_content)

    return { file_path, template }
  })

  // generate files
  compiled_templates.forEach(({ file_path, template }) => {
    // get file paths
    const relative_file_path = path.relative(template_folder_path, file_path)
    const content = template(data)

    // get target file path
    // remove .monorepo. or .single. from file name
    const target_file_path = path.join(
      target_project_folder_path,
      relative_file_path
        .replace(/\.monorepo$/, '')
        .replace(/\.single$/, '')
    )

    // create target parent directory
    fs.mkdirSync(path.dirname(target_file_path), { recursive: true })

    // write file
    fs.writeFileSync(target_file_path, content)
  })
  console.log(`${colors.green(compiled_templates.length)} files generated`)
}

export const generate_from_template = (template_relative_path: string, file_path: string, data: any) => {
  const template_path = path.join(__dirname, `../templates/${template_relative_path}`)
  const template = fs.readFileSync(template_path, 'utf-8')
  const compiled_template = handlebars.compile(template)

  const content = compiled_template(data)

  fs.writeFileSync(file_path, content)
}

export const generate_and_append_from_template = (template_relative_path: string, file_path: string, data: any) => {
  const template_path = path.join(__dirname, `../templates/${template_relative_path}`)
  const template = fs.readFileSync(template_path, 'utf-8')
  const compiled_template = handlebars.compile(template)

  const content = compiled_template(data)

  fs.appendFileSync(file_path, content)
}

export const copy_from_template = (template_relative_path: string, file_path: string) => {
  const template_path = path.join(__dirname, `../templates/${template_relative_path}`)
  const template = fs.readFileSync(template_path, 'utf-8')

  fs.writeFileSync(file_path, template)
}

export type GenerateFromTemplateFolderParams = {
  template_relative_folder_path: string
  target_project_folder_path: string
  is_monorepo: boolean
  data: any
}

const is_template_file = (file_path: string) => {
  return COMPATIBLE_TEMPLATE_EXTENSIONS.some(extension => (
    file_path.endsWith(extension)
    || file_path.endsWith(`${extension}.monorepo`)
    || file_path.endsWith(`${extension}.single`)
  ))
}

const COMPATIBLE_TEMPLATE_EXTENSIONS = [
  '.txt',
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
  '.yaml',
  '.yml',
  '.md',
  '.markdown',
  '.html',
  '.css',
  '.scss',
  '.sass',
  '.less'
]

