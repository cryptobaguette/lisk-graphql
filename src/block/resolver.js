const Bignum = require('../lisk/helpers/bignum');
const getAddressByPublicKey = require('../helpers/getAddressByPublicKey');

exports.resolver = {
  Block: {
    generatorId: block => getAddressByPublicKey(block.generatorPublicKey),
    totalForged: block =>
      new Bignum(block.totalFee).plus(new Bignum(block.reward)),
  },
};
