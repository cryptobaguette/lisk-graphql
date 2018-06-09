// https://github.com/LiskHQ/lisk/blob/0.9.15/logic/block.js#L53
/* eslint-disable */

const crypto = require('crypto');
const bignum = require('../lisk/helpers/bignum.js');

module.exports = publicKey => {
  var publicKeyHash = crypto
    .createHash('sha256')
    .update(publicKey, 'hex')
    .digest();
  var temp = Buffer.alloc(8);

  for (var i = 0; i < 8; i++) {
    temp[i] = publicKeyHash[7 - i];
  }

  var address = bignum.fromBuffer(temp).toString() + 'L';
  return address;
};
