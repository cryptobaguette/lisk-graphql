const { maxVotesPerAccount } = require('../lisk/constants');
const { BigNumber } = require('bignumber.js');

const { resolver: AccountResolver } = require('../account');
const { knex } = require('../knex');

// https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/logic/account.js#L418
const calculateProductivity = (producedBlocks, missedBlocks) => {
  const producedBlocksBignum = new Bignum(producedBlocks || 0);
  const missedBlocksBignum = new Bignum(missedBlocks || 0);
  const percent = producedBlocksBignum
    .dividedBy(producedBlocksBignum.plus(missedBlocksBignum))
    .times(100)
    .round(2);
  return !percent.isNaN() ? percent.toNumber() : 0;
};

// TODO implement this function as a graphql loader
// used in votesUsed && votesAvailable resolvers
const getVotersCountForDelegates = async delegate => {
  // See https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/db/sql/votes/get_votes_count.sql
  const res = await knex('mem_accounts2delegates')
    .where({ accountId: delegate.address })
    .count('*');
  const { count } = res[0];
  return count;
};

exports.resolver = {
  Delegate: {
    ...AccountResolver.Account,
    productivity: delegate =>
      calculateProductivity(delegate.producedBlocks, delegate.missedBlocks),
    votesUsed: getVotersCountForDelegates,
    votesAvailable: async delegate => {
      const votesCount = await getVotersCountForDelegates(delegate);
      return maxVotesPerAccount - votesCount;
    },
  },
};
