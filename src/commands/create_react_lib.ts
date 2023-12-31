import { generate_project } from "../utils/template"

// ----------------------------------------------------

export const create_react_lib = async (project_name: string) => {
  await generate_project({
    full_name: project_name,
    template: "react-lib",
    // options: options,
    pnpm: {
      install: true,
      add_to_workspace: true
    }
  })
}