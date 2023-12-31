import fastify from "fastify"
import cors from "@fastify/cors"
import formbody from "@fastify/formbody"
import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const server = () => {
  console.log(`start server...`)

  const server = fastify({
    logger: true
  })

  server.register(formbody)

  server.register(cors, {
    origin: '*'
  })

  server.get("/", async (request, reply) => {
    const data = await fs.readFile(path.join(__dirname, "../public/index.html"));
    reply.header("content-type", "text/html; charset=utf-8");
    reply.send(data);
  })

  server.ready(error => {
    if (error) throw error

    // server.swagger()
  })

  server.listen(3001, (error, address) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    console.log(`server listening on ${address}`)
  })
}

server()


