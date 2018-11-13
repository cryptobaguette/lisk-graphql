import { graphqlClient } from '../../testUtils';

describe('transactions', () => {
  it('should expose the same fields', async () => {
    // TODO senderPublicKey
    // TODO recipientPublicKey
    // TODO signature
    // TODO signatures
    const query = `
      query transactions {
        transactions {
          id
          height
          blockId
          type
          timestamp
          senderId
          recipientId
          amount
          fee
          confirmations
        }
      }
    `;
    const data = await graphqlClient.request<{ transactions: any[] }>(query);
    const transaction = data.transactions[0];
    expect(transaction.id).toBeTruthy();
    expect(transaction.height).toBeTruthy();
    expect(transaction.blockId).toBeTruthy();
    expect(transaction.type >= 0 && transaction.type <= 7).toBeTruthy();
    expect(transaction.timestamp).toBeTruthy();
    expect(transaction.senderId).toBeTruthy();
    expect(transaction.recipientId).toBeTruthy();
    expect(transaction.amount).toBeTruthy();
    expect(transaction.fee).toBeTruthy();
    expect(
      typeof transaction.confirmations === 'number' ||
        transaction.confirmations === null
    ).toBeTruthy();
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
});
