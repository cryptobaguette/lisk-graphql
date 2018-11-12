<h1 align="center">lisk-graphql</h1>

<p align="center">
  <img src="https://github.com/cryptobaguette/lisk-graphql/raw/master/assets/logo.png">
</p>

[![Build Status](https://travis-ci.org/cryptobaguette/lisk-graphql.svg?branch=master)](https://travis-ci.org/cryptobaguette/lisk-graphql)

Graphql api for lisk.

The aim of this project is to provide a graphql api on top of the lisk database to help you build new tools and applications.

**This project is based on the 1.0.0-beta.7 version and is not working with the 9.x version.**

## How to use

- Clone the repo on your server: `git clone https://github.com/cryptobaguette/lisk-graphql`.
- Install dependencies: `yarn install` or `npm install`.
- Set environment variables in `.env` file.
- Start the app: `yarn start` or `node src/index.js`.
- Open your browser and go to `http://your-server:3000/graphiql` to open the graphiql client.

![Graphiql](https://github.com/cryptobaguette/lisk-graphql/raw/master/assets/graphiql.png 'Graphiql')

## Options

```
{
  # Should activate graphiql or not
  "graphiql": true,

  # Connection infos to the lisk database
  "connection": {
    "host": "127.0.0.1",
    "user": "your_database_user",
    "password": "your_database_password",
    "database": "lisk_test"
  },

  # See lisk api.access config
  "access": {
    "public": false,
    "whiteList": ["127.0.0.1"]
  },

  # Rate limit config
  # See https://www.npmjs.com/package/express-rate-limit
  "limits": {
    "max": 0,
    "delayMs": 0,
    "delayAfter": 0,
    "windowMs": 60000
  }
}
```

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
