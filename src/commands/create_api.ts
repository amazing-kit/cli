import { generate_project } from "../utils/template"

// ----------------------------------------------------

export type ApiOptions = {
  ws?: boolean
  oidc?: boolean
  internal?: boolean
}

export const create_api = async (project_name: string, options?: ApiOptions) => {
  await generate_project({
    full_name: `${project_name}-common`,
    template: "api-common",
    options: options,
    pnpm: {
      install: true,
      add_to_workspace: true
    }
  })

  await generate_project({
    full_name: project_name,
    template: "api",
    options: options,
    pnpm: {
      install: true,
      add_to_workspace: true
    }
  })
}

// export const create_api = async (project_name: string, options?: ApiOptions) => {
//   console.log(`create api ${chalk.green(project_name)}...`)
//
//   const {
//     ws: is_ws = false,
//     oidc: is_oidc = false,
//     internal: is_internal = false
//   } = options ?? {}
//
//   const {
//     scope,
//     name,
//     is_in_mono_repo,
//     relative_project_path
//   } = await extract_project_info(project_name)
//
//   await generate_common(project_name, relative_project_path)
//
//   is_in_mono_repo
//    ? await generate_in_monorepo(relative_project_path)
//    : generate_in_alone_project(relative_project_path)
//
//   await execute_shell(`cd ${relative_project_path} && pnpm install`)
//
//   console.log(`api ${chalk.green(project_name)} created`)
//   console.log('')
// }
//
// // ----------------------------------------------------
//
// const generate_common = async (project_name: string, relative_project_path: string) => {
//   await fs.ensureDir(`${relative_project_path}/public`)
//   await fs.ensureDir(`${relative_project_path}/src`)
//
//   copy_from_template("api/src/index.ts", `${relative_project_path}/src/index.ts`)
//
//   generate_from_template(
//     "api/package.json",
//     `${relative_project_path}/package.json`,
//     { npm_name: project_name }
//   )
//
//   copy_from_template("api/tsconfig.json", `${relative_project_path}/tsconfig.json`)
//   copy_from_template("api/vite.config.ts", `${relative_project_path}/vite.config.ts`)
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
