<h1 align="center">lisk-graphql</h1>

<p align="center">
  <img src="https://github.com/cryptobaguette/lisk-graphql/raw/master/assets/logo.png">
</p>

Graphql api for lisk.

The aim of this project is to provide a graphql api on top of the lisk database to help you build new tools and applications.

**This project is based on the 1.0.0-beta.7 version and is not working with the 9.x version**

## How to use

- Clone the repo on your server: `git clone https://github.com/cryptobaguette/lisk-graphql`.
- Install dependencies: `yarn install` or `npm install`.
- Copy the example config file: `cp config.example.json config.json`.
- Edit the config file with your infos.
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
}
```

### Suggest changes / ask for a feature

Open an issue on this repo :)

### Contributing

Do you have an idea or want to contribute?
Pull requests are very welcome!
