const joinMonster = require('join-monster').default;

const { knex } = require('../knex');

exports.Query = {
  blocks(parent, args, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
  block(parent, args, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};
