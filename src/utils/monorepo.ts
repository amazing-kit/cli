import fs from "fs-extra"
import TOML from "@iarna/toml"
import { __dirname } from "./node"


export const check_if_monorepo = async () => {
  return await fs.exists('pnpm-workspace.yaml')&& await fs.exists('packages')
}

export const genereta_project_patch = (name: string) => {

}

export type MonorepoConfiguration = {
  general: {
    scope: string
    name: string
    type: "monorepo" | "react" | "server" | "lib"
  }
}
