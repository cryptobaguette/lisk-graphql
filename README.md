<h1 align="center">lisk-graphql</h1>

<p align="center">
  <img src="https://github.com/cryptobaguette/lisk-graphql/raw/master/assets/logo.png">
</p>

Graphql api for lisk.

# How to use

- Clone the repo on your server: `git clone https://github.com/cryptobaguette/lisk-graphql`.
- Install dependencies: `yarn install` or `npm install`.
- Copy the example config file: `cp config.example.json config.json`.
- Edit the config file with your infos.
- Start the app `yarn start` or `node src/index.js`.

# Options

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
