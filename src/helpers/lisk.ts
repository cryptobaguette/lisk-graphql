import { BigNumber } from 'bignumber.js';

export const fromRawLsk = (value: string | number, fixed?: number) =>
  new BigNumber(value || 0)
    .dividedBy(new BigNumber('1e+8'))
    .toFixed(fixed as any)
    .toString();
