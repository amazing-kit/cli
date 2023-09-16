import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import * as http from "http"
import { Server } from 'socket.io'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const server = () => {
  console.log('server 2')

  const app = express()
  const server = http.createServer(app)

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('a user connected')
  })

  server.listen(3000, () => {
    console.log('listening on *:3000')
  })
}

server()
