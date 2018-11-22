import { BigNumber } from 'bignumber.js';
import { maxVotesPerAccount } from '../lisk/constants';
import { resolver as AccountResolver } from '../account';
import { knex } from '../knex';

// https://github.com/LiskHQ/lisk/blob/v1.3.0/logic/account.js#L420
const calculateProductivity = (
  producedBlocks: number,
  missedBlocks: number
) => {
  const producedBlocksBignum = new BigNumber(producedBlocks || 0);
  const missedBlocksBignum = new BigNumber(missedBlocks || 0);
  const percent = producedBlocksBignum
    .dividedBy(producedBlocksBignum.plus(missedBlocksBignum))
    .times(100)
    .decimalPlaces(2);
  return !percent.isNaN() ? percent.toNumber() : 0;
};

// TODO implement this function as a graphql loader
// used in votesUsed && votesAvailable resolvers
const getVotersCountForDelegates = async (delegate: any) => {
  // See https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/db/sql/votes/get_votes_count.sql
  const res = await knex('mem_accounts2delegates')
    .where({ accountId: delegate.address })
    .count('*');
  const { count } = res[0];
  return count;
};

export const resolver = {
  Delegate: {
    ...AccountResolver.Account,
    productivity: (delegate: any) =>
      calculateProductivity(delegate.producedBlocks, delegate.missedBlocks),
    votesUsed: getVotersCountForDelegates,
    votesAvailable: async (delegate: any) => {
      const votesCount = await getVotersCountForDelegates(delegate);
      return maxVotesPerAccount - votesCount;
    },
  },
};
