# Start

```sh
docker compose --env-file ../.env up
```

# Zitadel

pour que Zitdale fonctionne

- username: zitadel-admin@zitadel.auth.127.0.0.1.nip.io (et non localhost)
- password: Password1! -> Secret1234!
- il faut aussi dans la command de lancement dans docker-compose.yaml `--tlsMode external` (indispensable pour le )
- dans les variables d'environnement
    - ZITADEL_EXTERNALSECURE=true
    - ZITADEL_EXTERNALDOMAIN=auth.127.0.0.1.nip.io
    - ZITADEL_EXTERNALPORT=443

create a new project

- amazing-is-better
- create applications
    - app -> User Agent (SPA)
        - PKCE
        - redirect URI: https://app.127.0.0.1.nip.io/authentication/callback (can be changed)
        - logout URI: https://app.127.0.0.1.nip.io/ (the last slash is important)
        - client secret -> 217084848081272835@amazing-is-better
        - refresh token
        - token settings -> JWT
          - api -> API
              - JWT
              -
                  - client secret -> 217085045465219075@amazing-is-better
                  - new key:
              ```txt
              {
                "type":"application",
                "keyId":"217085074506514435",
                "key":"-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEAzZ+GeTYEwQ68mqbsln4QbaMPewjazRterjs4lq3vmo8uGWYH\npy1KhvOS+U0y5l4EpeR2I9mM1qhlNWIR8lJ4tm/6yvBQZAYZB0pW8FYjS/5a1VtI\niTnMjmRv3zM/MrvIAGJc92LOLMRJWlylytKSWyGoD2EHBrqV0VCOLZiy0ZvtH9mf\nO0lN27BTf60VIMNiq4BBAzJ5L3oaX1MG9mRyqZzthgBwpU9JSwSxv/rRAbnftlbK\nyr8bTUTFDdIUkTqeMtpJGkaORk5aV4E1Pt6LE+7QoNcf+oZnwj6p7ztjL383kW2C\n6aki68VbEgMCDAeXZCynd++RiE3AMPl5LgppNQIDAQABAoIBABmvBWL6hll+97vx\ngbfCg1bOeU6K6pmYA5mLuCPKEhWiMMXnYqlVFOwKXJ9bLzJrJ/V4tfEAaYEeg5XJ\nbChyeLWBAzh6D/COem3YsUdP2xTQ7pOb1VGesJhQn1Cn3AsAPZkesDIOW2ZoFil9\nTRAqgTF04MMbAX+rqq78euXjHuLjd37tJvz5yy+5UpVg1hfF4wxY6mwbqFrf8m/E\nm62Sd5TilCqj9it4jYT+g/fDKFcU0ahoqX1tpd2s8JigOqcolBbDMAqIso7dnxlx\n92pQcC19OhfvUrDSwvgD2sxOzUVr6seOxihL+BKpkY3j/vAwNzYHOHpLJdY6pucV\nStAkLvkCgYEAz6Zk5uWPNcfX9QtB6zzDe/tkHsYwHbxrxudHsWZ3dHq1FY0h+QZC\neGQvJCqbOHyuvCnaxhnXqxCu5TZ3ShNTGjRcLuGkACJkUTMA4GuUvU56lpLyCBqd\nPjk1CbmuoiKMxlJhGK406LsuNRnAE7e6z4q9i5teDvERkLB1LriywO8CgYEA/YBQ\n0kmRjy4JNScRTUXCZJXXfzZAc2NI8/hrC/Ct+SMkWueqN1eJoGFcPyRxawqa6Jeb\ni2lw76nj7E0qRyot9zle7fKPgdUZ0mGzR36LFhOXpAh4vo3+LyPgEemRtVj3MIcd\nf7bqXWIjToQwxErxy5gva991DDYGDEwI5Caw8BsCgYA/RhLFEPpchvLVZoLFrZRb\nuTS+8+FBjmLBD0SXWAPaaHG5iXHqse+bQ9vhh2IZClUsXQyfBMzlAYZprfkXh1/x\nQjc8yeDxcYlj/MitmdqO/NT6APjjY0i65y+0MPJ30VNYM04G+T6CFFd2MsyGtZul\nFj+/xK4am3agwkRS4lEF3QKBgCC5S7WZoZymCLI/1M/wzWNGpIbbbf53Npen3cmw\nzAR5MNw7Q5HZTv7REqNkBPAYcl7ME1wvxFBr0exTGb4OB9j+Iu78fOH5rFeoHQiB\noVq8NLsMDOosUj+rleU6DYEnduFgz8IIzsA3Ru9/yPvN4OCzSIvYULe+0ZEMz6kE\nBZs5AoGAVSSdcyvyM6xDgeeQenAoZli6WB9pW77TzVGbYKKiQjzy23xKkxlGaU63\n82SxYNX9enmczA8MERkPnsw+dpUblGUHe1blnk8koTV8DvvIs58FocwsJX2jUqFL\n/yv9l5dXxWYwXN1lC+iKOvVu9jF/aTFd5bGF12q/efM7gPjTQOc=\n-----END RSA PRIVATE KEY-----\n",
                "appId":"217085045465153539",
                "clientId":"217085045465219075@amazing-is-better"
              }
              ```

