import lisk from 'lisk-elements';
import { BigNumber } from 'bignumber.js';

export const resolver = {
  Block: {
    generatorAddress: (block: any) =>
      lisk.cryptography.getAddressFromPublicKey(block.generatorPublicKey),
    totalForged: (block: any) =>
      new BigNumber(block.totalFee).plus(new BigNumber(block.reward)),
  },
};
