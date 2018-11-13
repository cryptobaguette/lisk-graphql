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
    const data = await graphqlClient.request<{ accounts: any[] }>(query);
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
        const data = await graphqlClient.request<{ accounts: any[] }>(query);
        expect(data.accounts.length).toBe(50);
      });
    });

    describe('offset', () => {
      it('should offset', async () => {
        const compareQuery = `
          query accounts {
            accounts {
              address
            }
          }
        `;
        const query = `
          query accounts {
            accounts(offset: 5) {
              address
            }
          }
        `;
        const [compareData, data] = await Promise.all([
          graphqlClient.request<{ accounts: any[] }>(compareQuery),
          graphqlClient.request<{ accounts: any[] }>(query),
        ]);
        expect(data.accounts[0].address).not.toBe(
          compareData.accounts[0].address
        );
        expect(data.accounts[4].address).not.toBe(
          compareData.accounts[4].address
        );
      });
    });

    describe('sort', () => {
      it('should sort by BALANCE_ASC', async () => {
        const query = `
          query accounts {
            accounts(sort: BALANCE_ASC) {
              address
              balance
            }
          }
        `;
        const data = await graphqlClient.request<{ accounts: any[] }>(query);
        // We skip the 0 index because it is "-100000000"
        expect(data.accounts[1].balance).toBe('0');
        expect(data.accounts[2].balance).toBe('0');
      });
    });

    it('should sort by BALANCE_DESC', async () => {
      const query = `
        query accounts {
          accounts(sort: BALANCE_DESC) {
            address
            balance
          }
        }
      `;
      const data = await graphqlClient.request<{ accounts: any[] }>(query);
      expect(data.accounts[0].balance).not.toBe('0');
      expect(data.accounts[0].balance).not.toBe(data.accounts[1].balance);
    });
  });
});
