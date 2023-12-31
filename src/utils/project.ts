import { cwd } from "node:process"
import fs from "fs-extra"
import path from "path"
import colors from "picocolors"
import { execute_shell } from "./node"


export type ProjectInfo =
  | SingleProjectInfo
  | MonorepoProjectInfo

export type SingleProjectInfo = {
  full_name: string
  scope?: string
  name: string
  npm_name: string
  relative_path: string
  is_in_mono_repo: false
}

export type MonorepoProjectInfo = {
  full_name: string
  scope?: string
  name: string
  npm_name: string
  relative_path: string
  is_in_mono_repo: true
  monorepo: {
    scope?: string
    name: string
    full_name: string
    relative_path: string
  }
}


export const extract_project_info = async (full_project_name: string): Promise<ProjectInfo> => {
  const project_name_parts = full_project_name.split("/")

  const scope = project_name_parts[0] === undefined || !project_name_parts[0].startsWith("@")
    ? undefined
    : project_name_parts[0]

  const name = project_name_parts[0] === undefined || !project_name_parts[0].startsWith("@")
    ? project_name_parts[0]
    : project_name_parts[1]

  const npm_name = scope === undefined
    ? name
    : `${scope}/${name}`

  const monorepo_data = await get_monorepo_info()
  const is_in_mono_repo = monorepo_data.is_monorepo

  const relative_path = is_in_mono_repo
    ? path.join(monorepo_data.relative_path, "packages", name)
    : name

  return is_in_mono_repo
    ? {
      full_name: full_project_name,
      scope,
      name,
      npm_name,
      relative_path,
      is_in_mono_repo,
      monorepo: {
        scope: monorepo_data.scope,
        name: monorepo_data.name,
        full_name: monorepo_data.full_name,
        relative_path: monorepo_data.relative_path
      }
    }
    : {
      full_name: full_project_name,
      scope,
      name,
      npm_name,
      relative_path,
      is_in_mono_repo
    }
}

export const extrat_name_info = (full_name: string) => {
  const project_name_parts = full_name.split("/")

  const scope = project_name_parts[0] === undefined || !project_name_parts[0].startsWith("@")
    ? undefined
    : project_name_parts[0]

  const name = project_name_parts[0] === undefined || !project_name_parts[0].startsWith("@")
    ? project_name_parts[0]
    : project_name_parts[1]

  return {
    scope,
    name,
    full_name
  }
}

export const get_project_path = async () => {
  if (!await fs.pathExists("package.json")) {
    console.log(colors.red("This command must be run in a monorepo or a project"))

    return {
      monorepo_path: undefined,
      project_path: undefined
    }
  }

  const current_path = await fs.realpath(cwd())

  const monorepo_path = (
    await fs.pathExists("../../package.json") && await fs.pathExists("../../packages")
      ? await fs.realpath(`${cwd()}/../..`) :
      await fs.pathExists("./packages")
        ? current_path
        : undefined
  )

  const project_path = (
    monorepo_path === undefined || monorepo_path === current_path
      ? current_path
      : undefined
  )

  return {
    monorepo_path,
    project_path
  }
}

export const get_project_name = (name: string, scope?: string) => (
  scope === undefined
    ? name
    : `${scope}/${name}`
)


export type MonorepoInfo =
  | {
      is_monorepo: true
      scope?: string
      name: string
      full_name: string
      relative_path: string
    }
  | {
      is_monorepo: false
    }

export const get_monorepo_info = async (): Promise<MonorepoInfo> => {
  const relative_path = (
    await fs.exists("pnpm-workspace.yaml") && await fs.exists("packages")
      ? "." :
      await fs.exists("../pnpm-workspace.yaml") && await fs.exists("../packages")
        ? ".."
        : undefined
  )

  if (relative_path === undefined) {
    return {
      is_monorepo: false
    }
  }

  const package_json = await fs.readJSON(path.join(relative_path, "package.json"))
  const full_name = package_json.name

  const name_data = extrat_name_info(full_name)

  return {
    is_monorepo: true,
    ...name_data,
    relative_path
  }
}