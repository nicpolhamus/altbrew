# Altbrew

Brewing software for making some good brews!

## Getting Started

Altbrew uses `docker-compose` to simulate a dev environment locally.

```shell
# to spin up the env and attach to the containers
$ docker-compose -f ./infra/docker-compose.local.yaml up

# to spin up the env dettached from the containers
$ docker-compose -f ./infra/docker-compose.local.yaml up -d

# to spin down the env
$ docker-compose -f ./infra/docker-compose.local.yaml down

# building docker-compose images
$ docker-compose -f ./infra/docker-compose.local.yaml build
```

**API Docs:**

The API docs can be viewed at `http://localhost:9000/api` once the API is up and running.

## Roadmap

- [ ] write tests for auth
- [ ] write tests for users
- [ ] write testing section in readme
- [ ] create recipe functionality
- [ ] setup basic UI
