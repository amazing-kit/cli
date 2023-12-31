import { Command } from 'commander'
import path from 'path'
import fs from "fs"
import { create_certificates } from "./commands/create_certificates"
import { create_documentation } from "./commands/create_documentation"
import { create_e2e } from "./commands/create_e2e"
import { create_full_stack } from "./commands/create_full_stack"
import { create_infra } from "./commands/create_infra"
import { create_lib } from "./commands/create_lib"
import { create_api } from "./commands/create_api"
import { create_monorepo } from "./commands/create_monorepo"
import { create_oidc_server } from "./commands/create_oidc_server"
import { create_react } from "./commands/create_react"
import { create_react_lib } from "./commands/create_react_lib"
import { create_trigger } from "./commands/create_trigger"
import {__dirname} from "./utils/node"

// TODO: add a prototype project to replace runjs ?

const program = new Command();

const package_json = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
const version = JSON.parse(package_json).version ?? "unknown"

program
  .version(version)
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


// ███████╗██╗   ██╗██╗     ██╗         ███████╗████████╗ █████╗  ██████╗██╗  ██╗
// ██╔════╝██║   ██║██║     ██║         ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
// █████╗  ██║   ██║██║     ██║         ███████╗   ██║   ███████║██║     █████╔╝
// ██╔══╝  ██║   ██║██║     ██║         ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
// ██║     ╚██████╔╝███████╗███████╗    ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
// ╚═╝      ╚═════╝ ╚══════╝╚══════╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝

create
  .command('fullstack <name>')
  .description('create fullstack project')
  .option('--ws', 'add a socket.io server')
  .option('--oidc', 'add an OIDC server with google, linkedin, facebook, github, microsoft and apple as providers')
  .requiredOption('--cert <certificate_path>', 'add local certificate folder path')
  .action(create_full_stack)


// ███╗   ███╗ ██████╗ ███╗   ██╗ ██████╗ ██████╗ ███████╗██████╗  ██████╗
// ████╗ ████║██╔═══██╗████╗  ██║██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔═══██╗
// ██╔████╔██║██║   ██║██╔██╗ ██║██║   ██║██████╔╝█████╗  ██████╔╝██║   ██║
// ██║╚██╔╝██║██║   ██║██║╚██╗██║██║   ██║██╔══██╗██╔══╝  ██╔═══╝ ██║   ██║
// ██║ ╚═╝ ██║╚██████╔╝██║ ╚████║╚██████╔╝██║  ██║███████╗██║     ╚██████╔╝
// ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝
create
  .command('monorepo <name>')
  .description('create monorepo project')
  .action(create_monorepo)

// ██╗     ██╗██████╗
// ██║     ██║██╔══██╗
// ██║     ██║██████╔╝
// ██║     ██║██╔══██╗
// ███████╗██║██████╔╝
// ╚══════╝╚═╝╚═════╝
create
  .command('lib <name>')
  .description('create a shared library')
  .action(create_lib)

// ██████╗ ███████╗ █████╗  ██████╗████████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝
// ██████╔╝█████╗  ███████║██║        ██║
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║
// ██║  ██║███████╗██║  ██║╚██████╗   ██║
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝
create
  .command('react <name>')
  .description('create a react application')
  .option('--ws', 'add a socket.io server')
  .option('--oidc', 'add an OIDC protected react app')
  .option('--spa', 'create a single page application')
  .option('--ssr', 'create a server side rendered application')
  .action(create_react)

// ██████╗ ███████╗ █████╗  ██████╗████████╗   ██╗     ██╗██████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝   ██║     ██║██╔══██╗
// ██████╔╝█████╗  ███████║██║        ██║█████╗██║     ██║██████╔╝
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║╚════╝██║     ██║██╔══██╗
// ██║  ██║███████╗██║  ██║╚██████╗   ██║      ███████╗██║██████╔╝
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝      ╚══════╝╚═╝╚═════╝
create
  .command('react-lib <name>')
  .description('create a react library with docz documentation')
  .action(create_react_lib)

// ███████╗██████╗ ███████╗
// ██╔════╝╚════██╗██╔════╝
// █████╗   █████╔╝█████╗
// ██╔══╝  ██╔═══╝ ██╔══╝
// ███████╗███████╗███████╗
// ╚══════╝╚══════╝╚══════╝
create
  .command('e2n')
  .description('create an E2E test application')
  .action(create_e2e)

//  █████╗ ██████╗ ██╗
// ██╔══██╗██╔══██╗██║
// ███████║██████╔╝██║
// ██╔══██║██╔═══╝ ██║
// ██║  ██║██║     ██║
// ╚═╝  ╚═╝╚═╝     ╚═╝
create
  .command('api <name>')
  .description('create a API application')
  .option('--ws', 'add a socket.io server')
  .option('--oidc', 'add an OIDC protected API')
  .option('--internal', 'set the API as internal')
  .action(create_api)
  .addHelpText('afterAll', `
Usage:
  amazing-kit create api @scope/name
  amazing-kit create api name
  `)

// ████████╗██████╗ ██╗ ██████╗  ██████╗ ███████╗██████╗
// ╚══██╔══╝██╔══██╗██║██╔════╝ ██╔════╝ ██╔════╝██╔══██╗
//    ██║   ██████╔╝██║██║  ███╗██║  ███╗█████╗  ██████╔╝
//    ██║   ██╔══██╗██║██║   ██║██║   ██║██╔══╝  ██╔══██╗
//    ██║   ██║  ██║██║╚██████╔╝╚██████╔╝███████╗██║  ██║
//    ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝
// TODO: see https://firebase.google.com/docs/functions/auth-blocking-events?hl=fr&gen=2nd
create
  .command('trigger')
  .requiredOption('--name <name>', 'set the trigger name')
  .requiredOption('--description <description>', 'set the trigger description')
  .requiredOption('--event <event>', 'set the trigger event')
  .requiredOption('--api <POST_api_url>', 'set the trigger as an API')
  .description('create a trigger')
  .addHelpText('afterAll', `
Event name format: <type>:<name>
Event types:
  - http
  - db
    - <data>:created
    - <data>:updated
    - <data>:deleted 
  - s3
    - object:created
    - object:updated
    - object:deleted
    - object:moved 
  - oidc
    - user:created
    - user:updated
    - user:deleted
    - user:signed_in
    - user:signed_out
  - pubsub:<topic>
  - cron:<schedule>
  
Usage:
  amazing-kit create trigger --name my_trigger --event db:order:created --api http://my_internal_api_url
  amazing-kit create trigger --name my_trigger --event "cron:30 23 * * *" --api http://my_internal_api_url
  amazing-kit create trigger --name my_trigger --event "pubsub:my_topic" --api http://my_internal_api_url
  `)
  .action(create_trigger)

//  ██████╗ ██╗██████╗  ██████╗
// ██╔═══██╗██║██╔══██╗██╔════╝
// ██║   ██║██║██║  ██║██║
// ██║   ██║██║██║  ██║██║
// ╚██████╔╝██║██████╔╝╚██████╗
//  ╚═════╝ ╚═╝╚═════╝  ╚═════╝
create
  .command('oidc')
  .description('create an OIDC server')
  .option('--all', 'use all OIDC providers')
  .option('-g, --google', 'use google as OIDC provider')
  .option('-l, --linkedin', 'use linkedin as OIDC provider')
  .option('-f, --facebook', 'use facebook as OIDC provider')
  .option('-g, --github', 'use github as OIDC provider')
  .option('-m, --microsoft', 'use microsoft as OIDC provider')
  .option('-a, --apple', 'use apple as OIDC provider')
  .action(create_oidc_server)

// ██╗███╗   ██╗███████╗██████╗  █████╗
// ██║████╗  ██║██╔════╝██╔══██╗██╔══██╗
// ██║██╔██╗ ██║█████╗  ██████╔╝███████║
// ██║██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║
// ██║██║ ╚████║██║     ██║  ██║██║  ██║
// ╚═╝╚═╝  ╚═══╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝
create
  .command('infra')
  .description('create the infrastructure for a project')
  .option('--all', 'use all infra components')
  .option('--postgres', 'add a postgres database')
  .option('--keydb', 'add a redis database')
  .option('--minio', 'add a minio S3 storage')
  .option('--nats', 'add a nats bus')
  .option('--nginx', 'add a nginx web server')
  .requiredOption('--cert <certificate_path>', 'add local certificate folder path')
  .action(create_infra)


//  ██████╗███████╗██████╗ ████████╗██╗███████╗██╗ █████╗  ██████╗████████╗███████╗███████╗
// ██╔════╝██╔════╝██╔══██╗╚══██╔══╝██║██╔════╝██║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔════╝
// ██║     █████╗  ██████╔╝   ██║   ██║█████╗  ██║███████║██║        ██║   █████╗  ███████╗
// ██║     ██╔══╝  ██╔══██╗   ██║   ██║██╔══╝  ██║██╔══██║██║        ██║   ██╔══╝  ╚════██║
// ╚██████╗███████╗██║  ██║   ██║   ██║██║     ██║██║  ██║╚██████╗   ██║   ███████╗███████║
//  ╚═════╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚══════╝╚══════╝
create
  .command('certificates <certificate_path>')
  .description('create the reusable certificates for web servers')
  .action(create_certificates)


// ██████╗  ██████╗  ██████╗██╗   ██╗███╗   ███╗███████╗███╗   ██╗████████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔═══██╗██╔════╝██║   ██║████╗ ████║██╔════╝████╗  ██║╚══██╔══╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
// ██║  ██║██║   ██║██║     ██║   ██║██╔████╔██║█████╗  ██╔██╗ ██║   ██║   ███████║   ██║   ██║██║   ██║██╔██╗ ██║
// ██║  ██║██║   ██║██║     ██║   ██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
// ██████╔╝╚██████╔╝╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   ██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═════╝  ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
create
  .command('documentation [name]')
  .description('create a documentation web site')
  .action(create_documentation)

// ███████╗██╗  ██╗███████╗ ██████╗██╗   ██╗████████╗███████╗
// ██╔════╝╚██╗██╔╝██╔════╝██╔════╝██║   ██║╚══██╔══╝██╔════╝
// █████╗   ╚███╔╝ █████╗  ██║     ██║   ██║   ██║   █████╗
// ██╔══╝   ██╔██╗ ██╔══╝  ██║     ██║   ██║   ██║   ██╔══╝
// ███████╗██╔╝ ██╗███████╗╚██████╗╚██████╔╝   ██║   ███████╗
// ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝

program
  .parse()