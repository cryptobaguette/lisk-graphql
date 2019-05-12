import { getAddressFromPublicKey } from '@liskhq/lisk-cryptography';
import { BigNumber } from 'bignumber.js';

export const resolver = {
  Block: {
    generatorAddress: (block: any) =>
      getAddressFromPublicKey(block.generatorPublicKey),
    totalForged: (block: any) =>
      new BigNumber(block.totalFee).plus(new BigNumber(block.reward)),
  },
};
