import { generate_project } from "../utils/template"

// ----------------------------------------------------

export const create_oidc_server = async () => {
  await generate_project({
    full_name: "oidc-server",
    template: "oidc-server",
    // options: options,
    pnpm: {
      install: true,
      add_to_workspace: true
    }
  })
}