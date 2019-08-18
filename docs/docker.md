---
id: docker
title: Docker
sidebar_label: Setup with Docker
---

This guide will explain you how to setup Lisk-GraphQL with docker-compose. In order to follow it you must install [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/) first.

### Lisk Core Docker setup

Follow [this guide](https://lisk.io/documentation/lisk-core/setup/docker) to setup the docker configuration for the Lisk node.

At the end of the guide you should have a Lisk Core node running on your server.

### Lisk-GraphQL setup

Add a new service to your docker compose configuration. Open the `docker-compose.override.yml` file and copy paste the following snippet. Change the `HASURA_GRAPHQL_DATABASE_URL` to point to the Lisk node Postgres database and `HASURA_GRAPHQL_ACCESS_KEY` to a long random string.

```yml
# docker-compose.override.yml
version: '3'

services:
  graphql-engine:
    image: hasura/graphql-engine:v1.0.0-beta.4
    ports:
      - '8080:8080'
    networks:
      - lisk
    depends_on:
      - db
    restart: always
    environment:
      HASURA_GRAPHQL_DATABASE_URL: postgres://DB_USERNAME:DB_PASSWORD@db:5432/lisk
      HASURA_GRAPHQL_ACCESS_KEY: myaccesskey
```

### Run the migrations

Now we need to run the Hasura migration that will create some SQL views and Hasura metadata in order to expose the schema.

You will first need to install the [Hasura cli](https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html).

Then in order to get the migrations you need to clone the git repository.

```bash
git clone https://github.com/cryptobaguette/lisk-graphql.git
cd lisk-graphql
```

Now you can run the migrations.

```bash
hasura migrate apply
```

And voila, your Hasura GraphQL server is now ready to accept your queries, mutations and subscriptions 🎉.
