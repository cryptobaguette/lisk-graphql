<h1 align="center">lisk-graphql</h1>
<h3 align="center">Graphql api for lisk</h1>

<p align="center">
  <img src="https://github.com/cryptobaguette/lisk-graphql/raw/master/assets/logo.png" height="200">
</p>

<p align="center">
  <a href="https://github.com/cryptobaguette/lisk-graphql/blob/master/LICENSE">
    <img src="https://badgen.net/badge/license/MIT/blue" alt="Licence">
  </a>
</p>

## 🙋 Why

The aim of this project is to provide a graphql api on top of the lisk database to help you build new tools and applications.

### Features

- Realtime subscriptions
- Optimized sql requests
- Filters and pagination
- Built with [hasura](https://github.com/hasura/graphql-engine/)

## 📚 How to use

We use docker-compose to run the lisk-graphql and lisk node server.

```bash
git clone https://github.com/cryptobaguette/lisk-graphql
cd lisk-graphql
```

Follow [this guide](https://lisk.io/documentation/lisk-core/setup/docker) to setup the docker configuration for the lisk node.

```bash
make            # will run `docker-compose up` for you
make coldstart  # will download and restore a blockchain snapshot for you
```

You can now open your browser and go to `http://your-server:8080` to open graphiql.

## 🛣️ Roadmap

- Improve documentation
- Dapps api
- Votes api
- Voters api

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
