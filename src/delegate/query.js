const joinMonster = require('join-monster').default;

const { knex } = require('../knex');

exports.Query = {
  delegates(parent, args, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
  delegate(parent, args, ctx, resolveInfo) {
    if (!args.username && !args.address && !args.publicKey) {
      throw new Error(
        'Missing required property: username, address or publicKey'
      );
    }
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};
