import { graphqlClient } from '../../testUtils';

const address = '6238004142195673234L';

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
  });
});
