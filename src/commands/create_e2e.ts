import { generate_project } from "../utils/template"

// ----------------------------------------------------

export const create_e2e = async () => {
  await generate_project({
    full_name: "e2e",
    template: "e2e",
    // options: options,
    pnpm: {
      install: true,
      add_to_workspace: true
    }
  })
}