import { graphqlClient } from '../../testUtils';

describe('accounts', () => {
  it('should fetch 10 accounts', async () => {
    const query = `
      query accounts {
        accounts {
          address
        }
      }
    `;
    const data = await graphqlClient.request<{ accounts: any }>(query);
    expect(data.accounts.length).toBe(10);
  });

  describe('args', () => {
    describe('limit', () => {
      it('should limit', async () => {
        const query = `
          query accounts {
            accounts(limit: 50) {
              address
            }
          }
        `;
        const data = await graphqlClient.request<{ accounts: any }>(query);
        expect(data.accounts.length).toBe(50);
      });
    });
  });
});
