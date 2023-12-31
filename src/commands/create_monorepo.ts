import { ProjectInfo } from "../utils/project"
import { generate_project } from "../utils/template"
import { create_api } from "./create_api"
import { create_documentation } from "./create_documentation"
import { create_e2e } from "./create_e2e"
import { create_infra } from "./create_infra"
import { create_lib } from "./create_lib"
import { create_oidc_server } from "./create_oidc_server"
import { create_react } from "./create_react"
import { create_react_lib } from "./create_react_lib"


export type MonorepoOptions = {

}

export const create_monorepo = async (project_name: string, options?: MonorepoOptions) => {
  await generate_project({
    full_name: project_name,
    template: "monorepo",
    options: options,
    pnpm: {
      install: true
    },
    next: (project_info: ProjectInfo, options?: MonorepoOptions) => {

    }
  })
}
