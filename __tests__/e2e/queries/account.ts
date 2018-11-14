import { graphqlClient } from '../../testUtils';

const address = '6238004142195673234L';
const publicKey =
  'd85d2106558fa3946c9b67fa7a8984f1b8d6e58e9ca559055555f5aee6aa280c';

describe('account', () => {
  describe('args', () => {
    describe('address', () => {
      it('should fetch account with address', async () => {
        const query = `
          query account {
            account(address: "${address}") {
              address
            }
          }
        `;
        const data = await graphqlClient.request<{ account: any }>(query);
        expect(data.account.address).toBeTruthy();
      });
    });

    describe('publicKey', () => {
      it('should fetch account with publicKey', async () => {
        const query = `
          query account {
            account(publicKey: "${publicKey}") {
              address
            }
          }
        `;
        const data = await graphqlClient.request<{ account: any }>(query);
        expect(data.account.address).toBeTruthy();
      });
    });
  });
});
