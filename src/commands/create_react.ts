import { generate_project } from "../utils/template"


export type ReactOptions = {
  oidc?: boolean
  spa?: boolean
  ssr?: boolean
}

export const create_react = async (project_name: string, options?: ReactOptions) => {
  await generate_project({
    full_name: project_name,
    template: "react",
    options: options,
    pnpm: {
      install: true,
      add_to_workspace: true
    }
  })
}