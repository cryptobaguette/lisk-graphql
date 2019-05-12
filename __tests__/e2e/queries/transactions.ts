import { graphqlClient, liskClient } from '../../testUtils';

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

  it('should match the lisk api response', async () => {
    const query = `
      query transactions {
        transactions {
          amountRaw
          blockId
          fee
          id
          recipientId
          senderId
          timestampRaw
          type
        }
      }
    `;
    const transaction = await graphqlClient
      .request<{ transactions: any[] }>(query)
      .then(data => data.transactions[0]);
    const liskTransaction = await liskClient.transactions
      .get({
        id: transaction.id,
      })
      .then((data: any) => data.data[0]);
    // We delete the asset field
    delete liskTransaction.asset;
    // TODO
    delete liskTransaction.signature;
    delete liskTransaction.signatures;
    expect(liskTransaction).toEqual({
      amount: transaction.amountRaw,
      blockId: transaction.blockId,
      fee: transaction.fee,
      id: transaction.id,
      recipientId: transaction.recipientId,
      senderId: transaction.senderId,
      timestamp: Number(transaction.timestampRaw),
      type: transaction.type,
      // Next fields are not relevant to test here (relations)
      confirmations: expect.any(Number),
      height: expect.any(Number),
      recipientPublicKey: expect.any(String),
      senderPublicKey: expect.any(String),
    });
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
