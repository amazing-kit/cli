import fs from "fs-extra"
import chalk from "chalk"
import { execute_shell } from "../utils/node"
import { extract_project_info } from "../utils/project"
import { copy_from_template, generate_from_template } from "../utils/template"

export const create_react = async (project_name: string) => {
  console.log(`create react ${chalk.green(project_name)}`)

  const {
    scope,
    name,
    is_in_mono_repo,
    relative_project_path
  } = await extract_project_info(project_name)

  await generate_common(project_name, relative_project_path)

  is_in_mono_repo
    ? generate_in_monorepo(relative_project_path)
    : generate_in_alone_project(relative_project_path)
  
  execute_shell(`pnpm install`)
}

// ----------------------------------------------------

const generate_common = async (project_name: string, relative_project_path: string) => {
  await fs.ensureDir(`${relative_project_path}/public`)
  await fs.ensureDir(`${relative_project_path}/src`)

  copy_from_template("react/src/App.css", `${relative_project_path}/src/App.css`)
  copy_from_template("react/src/App.tsx", `${relative_project_path}/src/App.tsx`)
  copy_from_template("react/src/index.css", `${relative_project_path}/src/index.css`)
  copy_from_template("react/src/main.tsx", `${relative_project_path}/src/main.tsx`)
  copy_from_template("react/src/vite-env.d.ts", `${relative_project_path}/src/vite-env.d.ts`)

  copy_from_template("react/.eslintrc.cjs", `${relative_project_path}/.eslintrc.cjs`)
  copy_from_template("react/.gitignore", `${relative_project_path}/.gitignore`)
  copy_from_template("react/index.html", `${relative_project_path}/index.html`)

  generate_from_template(
    "react/package.json",
    `${relative_project_path}/package.json`,
    { project_name, react_app_name: project_name }
  )

  copy_from_template("react/README.md", `${relative_project_path}/README.md`)
  copy_from_template("react/tsconfig.json", `${relative_project_path}/tsconfig.json`)
  copy_from_template("react/tsconfig.node.json", `${relative_project_path}/tsconfig.node.json`)
  copy_from_template("react/vite.config.ts", `${relative_project_path}/vite.config.ts`)
}

// ----------------------------------------------------

const generate_in_monorepo = (relative_project_path: string) => {
  execute_shell(`echo "  - '${relative_project_path}'" >> pnpm-workspace.yaml`)
}

// ----------------------------------------------------

const generate_in_alone_project = (relative_project_path: string) => {

}
