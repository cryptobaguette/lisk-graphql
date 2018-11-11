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
    const data = await graphqlClient.request<{ transactions: any[] }>(query);
    expect(apiResponse.data[0].id).toEqual(data.transactions[0].id);
    expect(apiResponse.data[0].height).toEqual(data.transactions[0].height);
    expect(apiResponse.data[0].blockId).toEqual(data.transactions[0].blockId);
    expect(apiResponse.data[0].type).toEqual(data.transactions[0].type);
    expect(apiResponse.data[0].timestamp.toString()).toEqual(
      data.transactions[0].timestamp
    );
    expect(apiResponse.data[0].senderId).toEqual(data.transactions[0].senderId);
    expect(
      apiResponse.data[0].recipientId === ''
        ? null
        : apiResponse.data[0].recipientId
    ).toEqual(data.transactions[0].recipientId);
    expect(apiResponse.data[0].amount).toEqual(data.transactions[0].amount);
    expect(apiResponse.data[0].fee).toEqual(data.transactions[0].fee);
    expect(apiResponse.data[0].confirmations).toEqual(
      data.transactions[0].confirmations
    );
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
