<h1 align="center">lisk-graphql</h1>
<h3 align="center">Graphql api for lisk</h1>

<p align="center">
  <img src="https://github.com/cryptobaguette/lisk-graphql/raw/master/assets/logo.png" height="200">
</p>

<p align="center">
  <a href="https://travis-ci.org/cryptobaguette/lisk-graphql">
    <img src="https://badgen.net/travis/cryptobaguette/lisk-graphql" alt="Build status">
  </a>
  <a href="https://github.com/cryptobaguette/lisk-graphql/blob/master/LICENSE">
    <img src="https://badgen.net/badge/license/MIT/blue" alt="Licence">
  </a>
</p>

![Playground](https://github.com/cryptobaguette/lisk-graphql/raw/master/assets/playground.png 'Playground')

## 🙋 Why

The aim of this project is to provide a graphql api on top of the lisk database to help you build new tools and applications.

### Features

- Optimized sql requests (we use [join-monster](https://github.com/acarl005/join-monster) to create the sql requests based on the graphql query)
- Feature parity with the lisk api

## 📚 How to use

First clone the repository and initialize the modules.

```bash
git clone https://github.com/cryptobaguette/lisk-graphql
cd lisk-graphql
# using yarn
yarn install
# Using npm
npm install
```

Copy the example environment file `cp .env.example .env` and then edit the file and setup the environment variables.

Then build the project.

```bash
yarn build
```

Start the app.

```bash
yarn start
node build/index.js
# Using pm2
pm2 start --name lisk-graphql build/index.js
```

You can now open your browser and go to `http://your-server:3000` to open the graphql playground.

## 🎛️ Options

Lisk-graphql can be customised using env variables.

| ENV Variable     | Default | description                                                                                              |
| ---------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| LISK_DB_DATABASE |         | PostgreSQL database name to connect to.                                                                  |
| LISK_DB_HOST     |         | PostgreSQL database host name.                                                                           |
| LISK_DB_USER     |         | PostgreSQL database username to connect to.                                                              |
| LISK_DB_PASSWORD |         | PostgreSQL database password to connect to.                                                              |
| PORT             | 3000    | Binds and listens for connections on the specified port.                                                 |
| AUTH_TOKEN       |         | Protect the graphql server with a token. We check if the token is present in the `authorization` header. |

## 🛣️ Roadmap

- Improve delegates api support
- Dapps api #3
- Support Graphql subscriptions #30

## ☝️ Suggest changes / ask for a feature

Open an issue on this repo :)

## 🤝 Contributing

Do you have an idea or want to contribute?
Pull requests are very welcome!

## 💰 Donations

If you like this project and want to support the development please consider making a donation to:

```
2865185670348234304L
```
