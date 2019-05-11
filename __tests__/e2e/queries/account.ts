import { graphqlClient } from '../../testUtils';

const address = '6238004142195673234L';
const publicKey =
  'd85d2106558fa3946c9b67fa7a8984f1b8d6e58e9ca559055555f5aee6aa280c';

describe('account', () => {
  describe('args', () => {
    describe('address', () => {
      it('should return null if account not found', async () => {
        const query = `
          query account {
            account(address: "test") {
              address
            }
          }
        `;
        const data = await graphqlClient.request<{ account: any }>(query);
        // TODO check no errors for all the responses
        expect(data.account).toBeNull();
      });

      it('should fetch account with address', async () => {
        const query = `
          query account {
            account(address: "${address}") {
              address
            }
          }
        `;
        const data = await graphqlClient.request<{ account: any }>(query);
        expect(data.account.address).toBe(address);
      });
    });

    describe('publicKey', () => {
      it('should throw an error if publicKey is malformed', async () => {
        const query = `
          query account {
            account(publicKey: "test") {
              address
            }
          }
        `;
        await expect(
          graphqlClient.request<{ account: any }>(query)
        ).rejects.toThrowErrorMatchingSnapshot();
      });

      it('should return null if account not found', async () => {
        const query = `
          query account {
            account(publicKey: "d85d2106558fa3946c9b67fa7a8984f1b8d6e58e9ca559055555f5aee6aa2815") {
              address
            }
          }
        `;
        const data = await graphqlClient.request<{ account: any }>(query);
        expect(data.account).toBeNull();
      });

      it('should fetch account with publicKey', async () => {
        const query = `
          query account {
            account(publicKey: "${publicKey}") {
              address
              publicKey
            }
          }
        `;
        const data = await graphqlClient.request<{ account: any }>(query);
        expect(data.account.address).toBeTruthy();
        expect(data.account.publicKey).toBe(publicKey);
      });
    });
  });
});
