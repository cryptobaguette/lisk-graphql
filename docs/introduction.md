---
id: introduction
title: Introduction
sidebar_label: Introduction
---

The aim of this project is to provide a graphql api on top of the lisk database to help you build new tools and applications.

The first version of this project was written in javascript and tried to implement all the features possible for the lisk api with realtime subscriptions. It was a lot of work and I never had time to finish it.

As you might know, Lisk is using PostgresSQL as a database. I decided to build the second version with [Hasura GraphQL Engine](https://github.com/hasura/graphql-engine).

> Hasura GraphQL Engine is a blazing-fast GraphQL server that gives you instant, realtime GraphQL APIs over Postgres, with webhook triggers on database events, and remote schemas for business logic.

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
