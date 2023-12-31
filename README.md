# @amazing-kit/cli

Useful commands to create and manage projects:

- monorepo with turbo
- react application
- fastify server application
- typescript library
- infrastructure with docker and kubernetes

The projects can be alone, or in a monorepo.


## Install

```shell
npm install -g @amazing-kit/cli
```

## Usage

```shell
amazing-kit --help
```

Create projects

```shell
# project name can be scoped

amazing-kit create monorepo @my-scope/my-monorepo

cd my-monorepo

amazing-kit create react @my-scope/app     # react app
amazing-kit create react-lib ui-components # fastify and socket.io servers
amazing-kit create api api                 # fastify server
amazing-kit create lib @my-scope/lib       # shared lib
amazing-kit create documentation           # docusaurus web site
```

> all projects can be created alone outside a monorepo

in progress

```shell
amazing-kit create infra        # docker-compose for dev and terraform + kubernetes for prod (postgres, redis, minio, nats, ingress, ...)
amazing-kit create oidc auth    # OIDC server
amazing-kit create trigger ...  # trigger to listen events and call API (postgres, redis, cron, web request, web socket, web events, storage events (S3)))
amazing-kit create certificates # generate certificates for HTTPS used in dev
```

## Development of the CLI

Use Volta to manage Node.js versions.

https://volta.sh/


```bash
# install locally
npm link

# remove local install
volta uninstall  @amazing-kit/cli
```