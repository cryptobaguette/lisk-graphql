<h1 align="center">lisk-graphql</h1>

<p align="center">
  <img src="https://github.com/cryptobaguette/lisk-graphql/raw/master/assets/logo.png">
</p>

[![Build Status](https://travis-ci.org/cryptobaguette/lisk-graphql.svg?branch=master)](https://travis-ci.org/cryptobaguette/lisk-graphql)

Graphql api for lisk.

The aim of this project is to provide a graphql api on top of the lisk database to help you build new tools and applications.

**This project is based on the version 1.x and is not working with the 9.x version.**

## How to use

- Clone the repo on your server: `git clone https://github.com/cryptobaguette/lisk-graphql`.
- Install dependencies: `yarn install` or `npm install`.
- Set environment variables in `.env` file.
- Build the project: `yarn build`.
- Start the app: `yarn start` or `node build/index.js`.
- Open your browser and go to `http://your-server:3000` to open the graphql playground.

![Playground](https://github.com/cryptobaguette/lisk-graphql/raw/master/assets/playground.png 'Playground')

## Options

- `LISK_DB_DATABASE`- PostgreSQL database name to connect to.
- `LISK_DB_HOST` - PostgreSQL database host name.
- `LISK_DB_USER` - PostgreSQL database username to connect to.
- `LISK_DB_PASSWORD` - PostgreSQL database password to connect to.
- `PORT` - Binds and listens for connections on the specified port. _default: 3000_
- `AUTH_TOKEN` - Protect the graphql server with a token. We check if the token is present in the `authorization` header.

### Suggest changes / ask for a feature

Open an issue on this repo :)

### Contributing

Do you have an idea or want to contribute?
Pull requests are very welcome!

## Donations

If you like this project and want to support the development please consider making a donation to:

```
2865185670348234304L
```
