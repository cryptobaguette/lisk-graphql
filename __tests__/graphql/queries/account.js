const lisk = require('lisk-elements').default;
const { graphql } = require('graphql');
const { schema } = require('../../../src/graphql');
const { apiFormatAccount } = require('../../testUtils');

const testnetClient = lisk.APIClient.createTestnetAPIClient();

const address = '16009998050678037905L';
const publicKey =
  '73ec4adbd8f99f0d46794aeda3c3d86b245bd9d27be2b282cdd38ad21988556b';

describe('account', () => {
  describe('args', () => {
    describe('address', () => {
      it('should fetch account with address', async () => {
        const apiResponse = await testnetClient.accounts.get({
          address,
        });
        const query = `
          query account {
            account(address: "${address}") {
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
        expect(data.account).toEqual(apiFormatAccount(apiResponse.data[0]));
      });
    });

    describe('publicKey', () => {
      it('should fetch account with publicKey', async () => {
        const apiResponse = await testnetClient.accounts.get({
          publicKey,
        });
        const query = `
          query account {
            account(publicKey: "${publicKey}") {
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
        expect(data.account).toEqual(apiFormatAccount(apiResponse.data[0]));
      });
    });
  });
});
