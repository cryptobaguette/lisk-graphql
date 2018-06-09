// https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/logic/account.js

const { typeDef } = require('./typeDef');

exports.typeDef = typeDef;

const { monster } = require('./monster');

exports.monster = monster;

const { Query } = require('./query');

exports.Query = Query;

const { resolver } = require('./resolver');

exports.resolver = resolver;
