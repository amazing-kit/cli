import { execute_shell } from "../utils/node"
import { extract_project_info, get_project_name, get_project_path, ProjectInfo } from "../utils/project"
import { generate_project } from "../utils/template"
import { create_api } from "./create_api"
import { create_documentation } from "./create_documentation"
import { create_e2e } from "./create_e2e"
import { create_infra } from "./create_infra"
import { create_lib } from "./create_lib"
import { MonorepoOptions } from "./create_monorepo"
import { create_oidc_server } from "./create_oidc_server"
import { create_react } from "./create_react"
import { create_react_lib } from "./create_react_lib"
import { chdir, cwd } from "node:process"

// ----------------------------------------------------

export type FullStackOptions = {
  ws?: boolean
  oidc?: boolean
  cert?: string
}

export const create_full_stack = async (project_name: string, options?: FullStackOptions) => {
  await generate_project({
    full_name: project_name,
    template: "monorepo",
    options: options,
    pnpm: {
      install: true
    },
    next: async (project_info: ProjectInfo, options?: FullStackOptions) => {
      const {
        oidc: is_oidc = false,
        cert: certificate_path
      } = options ?? {}

      const {
        scope,
        name,
        is_in_mono_repo,
        relative_path
      } = project_info

      chdir(relative_path)

      await create_react(get_project_name(`app`, scope), {
        oidc: is_oidc,
        spa: true,
        ssr: false
      })

      await create_react_lib(get_project_name(`design-system`, scope))

      await create_api(get_project_name(`api`, scope), {
        oidc: is_oidc,
        ws: true,
        internal: false
      })

      await create_lib(get_project_name(`common`, scope))

      await create_e2e()

      await create_documentation()

      await create_infra({
        all: true,
        cert: certificate_path
      })

      if (is_oidc) {
        await create_oidc_server()
      }
    }
  })
}