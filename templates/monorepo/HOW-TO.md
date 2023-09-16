# HOW TO REGENERATE THE TEMPLATES

```sh
mkdir proto-monorepo5
cd proto-monorepo5

pnpm init
npm pkg set name="@proto/root"
npm pkg set private=true --json

npm pkg set scripts.dev="run-p build:watch start:watch"
npm pkg set scripts.start:watch="turbo run start:watch"
npm pkg set scripts.build:watch="turbo run build:watch"
npm pkg set scripts.clean="rimraf node_modules/.cache/turbo"
npm pkg set scripts.clean:packages="pnpm run --recursive --parallel --if-present clean"
npm pkg set scripts.clean:all="run-p clean:packages clean"

pnpm add turbo rimraf npm-run-all

mkdir -p packages

cat <<EOF | tee pnpm-workspace.yaml
packages:
  - 'packages/shared'
  - 'packages/server'
  - 'packages/app'
EOF

cat <<EOF | tee .npmrc
node-linker=hoisted
EOF

# https://github.com/mui/material-ui/blob/master/tsconfig.json
cat <<EOF | tee tsconfig.json
{
  "compilerOptions": {
  "module": "esnext",
  "target": "es5",
  "lib": ["es2020", "dom"],
  "jsx": "preserve",
  "moduleResolution": "node",
  "forceConsistentCasingInFileNames": true,
  "strict": true,
  "noEmit": true,
  "experimentalDecorators": true,
  "baseUrl": "./",
  "allowSyntheticDefaultImports": true,
  "noErrorTruncation": false,
  "allowJs": true,
  "paths": {
    
  }
}
EOF

cat <<EOF | tee turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
  "build": {
    // A workspace's `build` task depends on that workspace's
    // topological dependencies' and devDependencies'
    // `build` tasks  being completed first. The `^` symbol
    // indicates an upstream dependency.
    "dependsOn": ["^build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts", "test/**/*.tsx"],
      "outputs": ["build/**", "dist/**"]
  },
  "build:watch": {
    // A workspace's `build` task depends on that workspace's
    // topological dependencies' and devDependencies'
    // `build` tasks  being completed first. The `^` symbol
    // indicates an upstream dependency.
    "dependsOn": ["^build"],
      "cache": false,
      "persistent": true,
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts", "test/**/*.tsx"],
      "outputs": ["build/**", "dist/**"]
  },
  "deploy": {
    // A workspace's `deploy` task depends on the `build`,
    // `test`, and `lint` tasks of the same workspace
    // being completed.
    "dependsOn": ["build", "test", "lint"]
  },
  "test": {
    // A workspace's `test` task depends on that workspace's
    // own `build` task being completed first.
    "dependsOn": ["build"],
      // A workspace's `test` task should only be rerun when
      // either a `.tsx` or `.ts` file has changed.
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts", "test/**/*.tsx"]
  },
  // A workspace's `lint` task has no dependencies and
  // can be run whenever.
  "lint": {},
  "start:watch": {
    "cache": false,
      "persistent": true
  }
}
EOF
```
