import { liskClient, graphqlClient } from '../../testUtils';

describe('transactions', () => {
  it('should expose the same fields', async () => {
    // TODO senderPublicKey
    // TODO recipientPublicKey
    // TODO signature
    // TODO signatures
    const apiResponse = await liskClient.transactions.get();
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
    const data = await graphqlClient.request<{ transactions: any }>(query);
    expect(apiResponse.data[0]).toEqual(data.transactions[0]);
  });

  it('should fetch 10 transactions', async () => {
    const apiResponse = await liskClient.transactions.get();
    const query = `
      query transactions {
        transactions {
          id
        }
      }
    `;
    const data = await graphqlClient.request<{ transactions: any }>(query);
    expect(apiResponse.data.length).toBe(10);
    expect(data.transactions.length).toBe(10);
  });
});
