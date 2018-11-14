const joinMonster = require('join-monster').default;

const { knex } = require('../knex');

exports.Query = {
  accounts(parent, args, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
  account(parent, args, ctx, resolveInfo) {
    // TODO allow find one by secondPublicKey
    if (!args.address && !args.publicKey) {
      throw new Error('Missing required property: address or publicKey');
    }
    // Validate publicKey format
    if (args.publicKey) {
      if (args.publicKey.length !== 64) {
        throw new Error('Invalid public key, must be 64 characters long');
      }
      // TODO verify hex formating
    }
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};
