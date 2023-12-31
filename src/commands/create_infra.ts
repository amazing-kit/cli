import fs from "fs-extra"
import colors from "picocolors"
import { extract_project_info, get_project_path } from "../utils/project"
import { generate_and_append_from_template, generate_from_template } from "../utils/template"

// ----------------------------------------------------

export type InfraOptions = {
  all?: boolean
  postgres?: boolean
  keydb?: boolean
  minio?: boolean
  nats?: boolean
  nginx?: boolean
  cert?: string
}

export const create_infra = async (options?: InfraOptions) => {
  console.log(`create ${colors.green('infra')}...`)

  const isPostgresEnabled = options?.all ?? options?.postgres ?? false
  const isKeyDBEnabled = options?.all ?? options?.keydb ?? false
  const isMinioEnabled = options?.all ?? options?.minio ?? false
  const isNatsEnabled = options?.all ?? options?.nats ?? false
  const isNginxEnabled = options?.all ?? options?.nginx ?? false
  const certificate_path = options?.cert

  const {
    monorepo_path,
    project_path,
  } = await get_project_path()

  const project_info = await extract_project_info("infra")

  if (monorepo_path === undefined && project_path === undefined) {
    console.log(colors.red("The current folder is not a project"))
    return;
  }

  const infra_path = `${monorepo_path ?? project_path}/infra`

  if (await fs.pathExists(infra_path)) {
    console.log(colors.red("The infra folder already exists"))
    return;
  }

  await fs.ensureDir(infra_path)

  const template_data = {
    isPostgresEnabled,
    isKeyDBEnabled,
    isMinioEnabled,
    isNatsEnabled,
    isNginxEnabled,
    certificate_path
  }

  generate_and_append_from_template(
    "infra/.env",
    `${infra_path}/../.env`,
    template_data
  )

  generate_from_template(
    "infra/docker-compose.yaml",
    `${infra_path}/docker-compose.yaml`,
    template_data
  )

  await fs.ensureDir(`${infra_path}/nginx`)
  await fs.ensureDir(`${infra_path}/nginx/conf.d`)
  await fs.ensureDir(`${infra_path}/nginx/sites-enabled`)

  generate_from_template(
    "infra/nginx/nginx.conf",
    `${infra_path}/nginx/nginx.conf`,
    template_data
  )

  generate_from_template(
    "infra/nginx/sites-enabled/app.127.0.0.1.nip.io.conf",
    `${infra_path}/nginx/sites-enabled/app.127.0.0.1.nip.io.conf`,
    template_data
  )

  generate_from_template(
    "infra/nginx/sites-enabled/auth.127.0.0.1.nip.io.conf",
    `${infra_path}/nginx/sites-enabled/auth.127.0.0.1.nip.io.conf`,
    template_data
  )


  // const {
  //   is_in_mono_repo,
  //   relative_project_path
  // } = await extract_project_info("infra")
  //
  // await generate_common("infra", relative_project_path)
  //
  // is_in_mono_repo
  // ? generate_in_monorepo(relative_project_path)
  // : generate_in_alone_project(relative_project_path)
  //
  // execute_shell(`cd ${relative_project_path} && pnpm install`)

  console.log(`${colors.green('infra')} created`)
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
