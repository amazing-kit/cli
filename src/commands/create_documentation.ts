import { generate_project } from "../utils/template"

// ----------------------------------------------------

export const create_documentation = async (project_name?: string) => {
  await generate_project({
    full_name: project_name ?? "documentation",
    template: "documentation"
  })

  // console.log(`create documentation ${chalk.green(project_name)}...`)
  //
  // const project_info = await extract_project_info(project_name ?? "documentation")
  //
  // console.log('project_info', project_info)
  //
  // generate_from_template_folder({
  //   template_relative_folder_path: "documentation",
  //   target_folder_path: project_info.relative_path,
  //   is_monorepo: project_info.is_in_mono_repo,
  //   data: project_info
  // })

  // TODO: create a function that extract project info from project name and generate the project from a template folder
  // and return the project info to be used in the next steps

  // generate_project({
  //   full_name: "@scope/name",
  //   template: "template",
  //   options: options,
  //   pnpm: {
  //     install: true,
  //     add_to_workspace: true
  //   },
  //   next: (project_info) => {
  //     // next steps
  //   }
  // })
  // -> logs start and end

  // TODO: create a function that generate the command action

  // instead of:
  // create
  //   .command('react <name>')
  //   .description('create a react application')
  //   .option('--oidc', 'add an OIDC protected react app')
  //   .option('--spa', 'create a single page application')
  //   .option('--ssr', 'create a server side rendered application')
  //   .action(create_react)

  // use:
  // const new_create_command = create_command_builder("create")
  //
  // new_create_command({
  //   command: "react <name>",
  //   description: "create a react application",
  //   options: {
  //     "--api <POST_api_url>*": "add an API",
  //     "-f, --fullstack": "fullstack monorepo (with react + API + common lib + infra)",
  //     "--oidc": "add an OIDC protected react app",
  //     "--spa": "create a single page application",
  //     "--ssr": "create a server side rendered application"
  //   },
  //   template: "react",
  //   config: {
  //     pnpm: {
  //       install: true,
  //       add_to_workspace: true
  //     }
  //   },
  //   next: (project_info) => {
  //     // next steps
  //   }
  // })

  // console.log(`documentation ${chalk.green(project_name)} created`)
  // console.log('')
}

// ----------------------------------------------------

// const generate_common = async (project_name: string, relative_project_path: string) => {
//   await fs.ensureDir(`${relative_project_path}/src`)
//
//   copy_from_template("lib/src/index.ts", `${relative_project_path}/src/index.ts`)
//
//   generate_from_template(
//     "lib/package.json",
//     `${relative_project_path}/package.json`,
//     { npm_name: project_name }
//   )
//
//   copy_from_template("lib/tsconfig.json", `${relative_project_path}/tsconfig.json`)
//   copy_from_template("lib/vite.config.ts", `${relative_project_path}/vite.config.ts`)
// }
//
// // ----------------------------------------------------
//
// const generate_in_monorepo = async (relative_project_path: string) => {
//   copy_from_template("lib/tsconfig-monorepo.json", `${relative_project_path}/tsconfig.json`)
//
//   await execute_shell(`echo "  - '${relative_project_path}'" >> pnpm-workspace.yaml`)
// }
//
// // ----------------------------------------------------
//
// const generate_in_alone_project = (relative_project_path: string) => {
//   copy_from_template("lib/tsconfig.json", `${relative_project_path}/tsconfig.json`)
// }
