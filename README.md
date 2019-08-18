<h1 align="center">lisk-graphql</h1>
<h3 align="center">Graphql api for lisk</h1>

<p align="center">
  <img src="https://github.com/cryptobaguette/lisk-graphql/raw/master/static/img/banner.png" height="200">
</p>

<p align="center">
  <a href="https://github.com/cryptobaguette/lisk-graphql/blob/master/LICENSE">
    <img src="https://badgen.net/badge/license/MIT/blue" alt="Licence">
  </a>
</p>

## 🙋 Why

The aim of this project is to provide a GraphQL api on top of the Lisk database to help you build new tools and applications.

Using Hasura give us the ability to subscribe and query the database directly. For example a client **can subscribe to the new blocks forged in realtime** like this.

```graphql
subscription newBlocks {
  blocks_public(limit: 1, order_by: { height: desc }) {
    id
    height
    timestamp
    numberOfTransactions
    totalAmount
  }
}
```

### Features

- Realtime subscriptions
- Optimized sql requests
- Filters and pagination
- Built with [hasura](https://github.com/hasura/graphql-engine/)

## 📚 How to use

Check out the Getting Started guide.

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
