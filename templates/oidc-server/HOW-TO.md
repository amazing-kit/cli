# HOW TO REGENERATE THE TEMPLATES

mkdir -p packages/server/src
cd packages/server
pnpm init
npm pkg set name="@proto/server"

pnpm add express cors socket.io
pnpm add -D typescript @types/node @types/express vite rimraf npm-run-all
# pnpm add -D @tsconfig/node18
pnpm add @proto/shared

npm pkg set main="dist/index.js"
npm pkg set type="module"
npm pkg set private=true --json

npm pkg set scripts.build="vite build"
npm pkg set scripts.build:watch="vite build --watch"
npm pkg set scripts.dev="run-p build:watch start:watch"
npm pkg set scripts.start="node dist/index.js"
# nodemon has to be installed in global (see prerequisites)
npm pkg set scripts.start:watch="nodemon --watch dist --watch ../shared/dist dist/index.js"
npm pkg set scripts.clean="rimraf dist .turbo"

cat <<EOF | tee tsconfig.json
{
"extends": "../../tsconfig.json",
"compilerOptions": {
"rootDir": "src",
"outDir": "dist",
"types": ["node"]
},
"include": ["src"],
"exclude": ["node_modules", "dist", "lib", "coverage", "test/**/*.spec.ts"]
}
EOF

cat <<EOF | tee vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
return {
build: {
target: 'node18', // not sure if this is needed
ssr: true, // without this, the build will integrate all dependencies into the output file

      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['esm'], // without this, the build will be for esm and cjs
      }
    },
};
});
EOF

cat <<EOF | tee src/index.ts
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import * as http from "http"
import { Server } from 'socket.io'

import { shared } from '@proto/shared'

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

server.listen(3001, () => {
console.log('listening on *:3001')
})
}

server()
EOF

mkdir -p public

cat <<EOF | tee public/index.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  </head>
  <body>
  <h1>Hello server</h1>
</body>
</html>

EOF

cd ../..