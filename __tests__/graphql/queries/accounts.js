const { graphql } = require('graphql');
const { schema } = require('../../../src/graphql');
const { apiFormatAccount, liskApiCLient } = require('../../testUtils');

describe('accounts', () => {
  it('should fetch 10 accounts', async () => {
    const apiResponse = await liskApiCLient.accounts.get();
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
    expect(data.accounts.length).toBe(10);
    expect(data.accounts).toEqual(apiResponse.data.map(apiFormatAccount));
  });

  describe('args', () => {
    describe('limit', () => {
      it('should limit', async () => {
        const apiResponse = await liskApiCLient.accounts.get({
          limit: 50,
        });
        const query = `
          query accounts {
            accounts(limit: 50) {
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
        expect(data.accounts.length).toBe(50);
        expect(data.accounts).toEqual(apiResponse.data.map(apiFormatAccount));
      });
    });

    describe('offset', () => {
      it('should offset', async () => {
        const apiResponse = await liskApiCLient.accounts.get({
          offset: 10,
        });
        const query = `
          query accounts {
            accounts(offset: 10) {
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
        expect(data.accounts.length).toBe(50);
        expect(data.accounts).toEqual(apiResponse.data.map(apiFormatAccount));
      });
    });

    describe('sort', () => {
      it('should sort by BALANCE_ASC', async () => {
        const apiResponse = await liskApiCLient.accounts.get({
          sort: 'balance:asc',
        });
        const query = `
            query accounts {
              accounts(sort: BALANCE_ASC) {
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
        expect(data.accounts).toEqual(apiResponse.data.map(apiFormatAccount));
      });

      it('should sort by BALANCE_DESC', async () => {
        const apiResponse = await liskApiCLient.accounts.get({
          sort: 'balance:desc',
        });
        const query = `
            query accounts {
              accounts(sort: BALANCE_DESC) {
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
        expect(data.accounts).toEqual(apiResponse.data.map(apiFormatAccount));
      });
    });
  });
});
