import { check_if_monorepo } from "./monorepo"


export const extract_project_info = async (project_name: string) => {
  const project_name_parts = project_name.split('/')

  const scope = project_name_parts[0] === undefined || !project_name_parts[0].startsWith('@') ? undefined : project_name_parts[0]
  const name = project_name_parts[0] === undefined || !project_name_parts[0].startsWith('@') ? project_name_parts[0] : project_name_parts[1]

  const is_in_mono_repo = await check_if_monorepo()

  const relative_project_path = is_in_mono_repo
                                ? `packages/${name}`
                                : name

  return {
    scope,
    name,
    is_in_mono_repo,
    relative_project_path
  }
}