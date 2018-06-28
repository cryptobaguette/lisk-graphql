const { graphql } = require('graphql');
const { schema } = require('../../../src/graphql');

describe('account', () => {
  it('should fetch account', async () => {
    const query = `
      query account {
        account(address: "16009998050678037905L") {
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
    expect(data.account.address).toBeTruthy();
  });
});
