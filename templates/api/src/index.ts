import fastify from "fastify"
import cors from "@fastify/cors"
import formbody from "@fastify/formbody"
import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"
{{#if options.ws}}
import socketioServer from "fastify-socket.io"
import { Server as SocketIOServer } from "socket.io";
{{/if}}
import type { ClientToServerEvents, ServerToClientEvents, InterServerEvents } from "{{npm_name}}-common"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

{{#if options.ws}}
declare module "fastify" {
  interface FastifyInstance {
    io: SocketIOServer<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >;
  }
}
{{/if}}


export const server = () => {
  console.log(`start server...`)

  const server = fastify({
    logger: true
  })

  server.register(formbody)

  server.register(cors, {
    origin: '*'
  })
  {{#if options.ws}}

  server.register(socketioServer);
  {{/if}}
    
  server.get("/", async (request, reply) => {
    const data = await fs.readFile(path.join(__dirname, "../public/index.html"));
    reply.header("content-type", "text/html; charset=utf-8");
    reply.send(data);
  })

  server.ready(error => {
    if (error) throw error

    // server.swagger()
    {{#if options.ws}}

    server.io.on("connection", (socket) => {
      console.info("Socket connected!", socket.id)
    });
    {{/if}}
  })

  server.listen(3000, (error, address) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    console.log(`server listening on ${address}`)
  })
}

server()


