const lisk = require('lisk-elements');
const Bignum = require('../lisk/helpers/bignum');

exports.resolver = {
  Block: {
    generatorId: block =>
      lisk.cryptography.getAddressFromPublicKey(block.generatorPublicKey),
    totalForged: block =>
      new Bignum(block.totalFee).plus(new Bignum(block.reward)),
  },
};
