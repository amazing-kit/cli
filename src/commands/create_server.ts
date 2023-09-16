import fs from "fs-extra"
import chalk from "chalk"
import { check_if_monorepo } from "../utils/monorepo"
import { execute_shell } from "../utils/node"
import { extract_project_info } from "../utils/project"
import { copy_from_template, generate_from_template } from "../utils/template"

// ----------------------------------------------------

export const create_server = async (project_name: string) => {
  console.log(`create server ${chalk.green(project_name)}`)

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

  execute_shell(`cd ${relative_project_path} && pnpm install`)
}

// ----------------------------------------------------

const generate_common = async (project_name: string, relative_project_path: string) => {
  await fs.ensureDir(`${relative_project_path}/public`)
  await fs.ensureDir(`${relative_project_path}/src`)

  copy_from_template("server/src/index.ts", `${relative_project_path}/src/index.ts`)

  generate_from_template(
    "server/package.json",
    `${relative_project_path}/package.json`,
    { npm_name: project_name }
  )

  copy_from_template("server/tsconfig.json", `${relative_project_path}/tsconfig.json`)
  copy_from_template("server/vite.config.ts", `${relative_project_path}/vite.config.ts`)
}

// ----------------------------------------------------

const generate_in_monorepo = (relative_project_path: string) => {
  copy_from_template("lib/tsconfig-monorepo.json", `${relative_project_path}/tsconfig.json`)

  execute_shell(`echo "  - '${relative_project_path}'" >> pnpm-workspace.yaml`)
}

// ----------------------------------------------------

const generate_in_alone_project = (relative_project_path: string) => {
  copy_from_template("lib/tsconfig.json", `${relative_project_path}/tsconfig.json`)
}
