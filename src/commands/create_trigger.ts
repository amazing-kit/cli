import colors from "picocolors"

// ----------------------------------------------------

export const create_trigger = async (project_name: string) => {
  console.log(`create trigger ${colors.green(project_name)}`)

  // const {
  //   scope,
  //   name,
  //   is_in_mono_repo,
  //   relative_project_path
  // } = await extract_project_info(project_name)
  //
  // await generate_common(project_name, relative_project_path)
  //
  // is_in_mono_repo
  // ? generate_in_monorepo(relative_project_path)
  // : generate_in_alone_project(relative_project_path)
  //
  // await execute_shell(`cd ${relative_project_path} && pnpm install`)

  console.log(`trigger ${colors.green(project_name)} created`)
  console.log('')
}

// ----------------------------------------------------

const generate_common = async (project_name: string, relative_project_path: string) => {
  // await fs.ensureDir(`${relative_project_path}/src`)
  //
  // copy_from_template("lib/src/index.ts", `${relative_project_path}/src/index.ts`)
  //
  // generate_from_template(
  //   "lib/package.json",
  //   `${relative_project_path}/package.json`,
  //   { npm_name: project_name }
  // )
  //
  // copy_from_template("lib/tsconfig.json", `${relative_project_path}/tsconfig.json`)
  // copy_from_template("lib/vite.config.ts", `${relative_project_path}/vite.config.ts`)
}

// ----------------------------------------------------

const generate_in_monorepo = (relative_project_path: string) => {
  // copy_from_template("lib/tsconfig-monorepo.json", `${relative_project_path}/tsconfig.json`)
  //
  // execute_shell(`echo "  - '${relative_project_path}'" >> pnpm-workspace.yaml`)
}

// ----------------------------------------------------

const generate_in_alone_project = (relative_project_path: string) => {
  // copy_from_template("lib/tsconfig.json", `${relative_project_path}/tsconfig.json`)
}
