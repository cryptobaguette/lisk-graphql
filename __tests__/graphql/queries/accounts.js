const lisk = require('lisk-elements').default;
const { graphql } = require('graphql');
const { schema } = require('../../../src/graphql');

const testnetClient = lisk.APIClient.createTestnetAPIClient();

describe('accounts', () => {
  it('should fetch accounts', async () => {
    const query = `
      query accounts {
        accounts {
          address
          balance
          unconfirmedBalance
          publicKey
          secondPublicKey
        }
      }
    `;
    const { data, errors } = await graphql(schema, query, {}, {});
    expect(errors).toBeUndefined();
    expect(data.accounts.length).toBe(100);
  });

  describe('parameters', () => {
    it('should limit', async () => {
      const apiResponse = await testnetClient.accounts.get();
      const query = `
        query accounts {
          accounts(limit: 10) {
            address
            balance
            unconfirmedBalance
            publicKey
            secondPublicKey
          }
        }
      `;
      const { data, errors } = await graphql(schema, query, {}, {});
      expect(errors).toBeUndefined();
      expect(data.accounts.length).toBe(10);
      expect(data.accounts).toEqual(
        apiResponse.data.map(account => ({
          address: account.address,
          balance: account.balance,
          unconfirmedBalance: account.unconfirmedBalance,
          publicKey: account.publicKey,
          secondPublicKey: account.secondPublicKey || null,
        }))
      );
    });

    // TODO test offset
  });
});
