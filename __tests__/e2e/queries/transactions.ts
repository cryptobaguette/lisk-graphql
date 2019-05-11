import { graphqlClient } from '../../testUtils';

describe('transactions', () => {
  it('should expose the transaction fields', async () => {
    // TODO senderPublicKey
    // TODO recipientPublicKey
    // TODO signature
    // TODO signatures
    const query = `
      query transactions {
        transactions {
          id
          blockId
          type
          timestamp
          senderId
          recipientId
          amount
          fee
        }
      }
    `;
    const data = await graphqlClient.request<{ transactions: any[] }>(query);
    const transaction = data.transactions[0];
    expect(transaction.id).toBeTruthy();
    expect(transaction.blockId).toBeTruthy();
    expect(transaction.type >= 0 && transaction.type <= 7).toBeTruthy();
    expect(transaction.timestamp).toBeTruthy();
    expect(transaction.senderId).toBeTruthy();
    expect(transaction.recipientId).toBeTruthy();
    expect(transaction.amount).toBeTruthy();
    expect(transaction.fee).toBeTruthy();
  });

  it('should fetch 10 transactions', async () => {
    const query = `
      query transactions {
        transactions {
          id
        }
      }
    `;
    const data = await graphqlClient.request<{ transactions: any }>(query);
    expect(data.transactions.length).toBe(10);
  });

  describe('args', () => {
    describe('limit', () => {
      it('should limit', async () => {
        const query = `
          query transactions {
            transactions(limit: 50) {
              id
            }
          }
        `;
        const data = await graphqlClient.request<{ transactions: any[] }>(
          query
        );
        expect(data.transactions.length).toBe(50);
      });
    });

    describe('offset', () => {
      it('should offset', async () => {
        const compareQuery = `
          query transactions {
            transactions {
              id
            }
          }
        `;
        const query = `
          query transactions {
            transactions(offset: 5) {
              id
            }
          }
        `;
        const [compareData, data] = await Promise.all([
          graphqlClient.request<{ transactions: any[] }>(compareQuery),
          graphqlClient.request<{ transactions: any[] }>(query),
        ]);
        expect(data.transactions[0].id).not.toBe(
          compareData.transactions[0].id
        );
        expect(data.transactions[4].id).not.toBe(
          compareData.transactions[4].id
        );
      });
    });
  });
});
