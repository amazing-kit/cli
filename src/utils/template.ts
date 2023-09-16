import handlebars from "handlebars"
import fs from "fs"
import path from "path"
import {__dirname} from "./node"

export const generate_from_template = (template_relative_path: string, file_path: string, data: any) => {
  const template_path = path.join(__dirname, `../templates/${template_relative_path}`)
  const template = fs.readFileSync(template_path, 'utf-8')
  const compiled_template = handlebars.compile(template)

  const content = compiled_template(data)

  fs.writeFileSync(file_path, content)
}

export const copy_from_template = (template_relative_path: string, file_path: string) => {
  const template_path = path.join(__dirname, `../templates/${template_relative_path}`)
  const template = fs.readFileSync(template_path, 'utf-8')

  fs.writeFileSync(file_path, template)
}

