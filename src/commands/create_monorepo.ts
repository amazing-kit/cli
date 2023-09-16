import fs from "fs-extra"
import chalk from "chalk"
import { execute_shell } from "../utils/node"
import { extract_project_info } from "../utils/project"
import { copy_from_template, generate_from_template } from "../utils/template"

export type MonorepoOptions = {

}

export const create_monorepo = async (project_name: string, options?: MonorepoOptions) => {
  console.log(`init project ${chalk.green(project_name)}`)

  const {
    scope,
    name,
    is_in_mono_repo,
    relative_project_path
  } = await extract_project_info(project_name)

  if (is_in_mono_repo) {
    console.log(chalk.red("This project is already in a monorepo"))
    return;
  }

  await fs.ensureDir(`${name}/packages`)

  copy_from_template("monorepo/.npmrc", `${name}/.npmrc`)

  generate_from_template(
    "monorepo/package.json",
    `${name}/package.json`,
    { project_name }
  )

  copy_from_template("monorepo/pnpm-workspace.yaml", `${name}/pnpm-workspace.yaml`)
  copy_from_template("monorepo/tsconfig.json", `${name}/tsconfig.json`)
  copy_from_template("monorepo/turbo.json", `${name}/turbo.json`)

  execute_shell(`cd ${name} && pnpm install`)
}
