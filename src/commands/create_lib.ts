import { generate_project } from "../utils/template"

// ----------------------------------------------------

export const create_lib = async (project_name: string) => {
  await generate_project({
    full_name: project_name,
    template: "lib",
    // options: options,
    pnpm: {
      install: true,
      add_to_workspace: true
    }
  })
}