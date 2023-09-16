import { Command } from 'commander'
import path from 'path'
import fs from "fs"
import { create_lib } from "./commands/create_lib"
import { create_server } from "./commands/create_server"
import { create_monorepo } from "./commands/create_monorepo"
import { create_react } from "./commands/create_react"
import {__dirname} from "./utils/node"

const program = new Command();

const package_json = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
const version = JSON.parse(package_json).version ?? "unknown"

program
  .version(version)
  .option('-p, --prod', 'production')
  .usage(`amazing-kit create server @scope/name
  amazing-kit create server name
  `)

//  ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ █████╗ ███╗   ██╗██████╗ ███████╗
// ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝
// ██║     ██║   ██║██╔████╔██║██╔████╔██║███████║██╔██╗ ██║██║  ██║███████╗
// ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║╚██╗██║██║  ██║╚════██║
// ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║██████╔╝███████║
//  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝

const create = program
  .command('create')

create
  .command('monorepo <name>')
  .description('create monorepo project')
  .action(create_monorepo)

create
  .command('lib <name>')
  .description('create a shared library')
  .action(create_lib)

create
  .command('react <name>')
  .description('create a react application')
  .action(create_react)

create
  .command('server <name>')
  .description('create a server application')
  .action(create_server)
  .addHelpText('afterAll', `
Usage:
  amazing-kit create server @scope/name
  amazing-kit create server name
  `)


// ███████╗██╗  ██╗███████╗ ██████╗██╗   ██╗████████╗███████╗
// ██╔════╝╚██╗██╔╝██╔════╝██╔════╝██║   ██║╚══██╔══╝██╔════╝
// █████╗   ╚███╔╝ █████╗  ██║     ██║   ██║   ██║   █████╗
// ██╔══╝   ██╔██╗ ██╔══╝  ██║     ██║   ██║   ██║   ██╔══╝
// ███████╗██╔╝ ██╗███████╗╚██████╗╚██████╔╝   ██║   ███████╗
// ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝

program
  .parse()