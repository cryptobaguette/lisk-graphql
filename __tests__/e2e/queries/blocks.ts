import { graphqlClient } from '../../testUtils';

describe('blocks', () => {
  it('should expose the blocks fields', async () => {
    const query = `
      query blocks {
        blocks {
          id
          version
          timestamp
          height
          numberOfTransactions
          totalAmount
          totalFee
          reward
          payloadLength
          payloadHash
          generatorPublicKey
          blockSignature
          confirmations
          totalForged
          generatorAddress
          previousBlockId
        }
      }
    `;
    const data = await graphqlClient.request<{ blocks: any[] }>(query);
    const block = data.blocks[0];
    expect(block.id).toBeTruthy();
    expect(block.version).toBe(1);
    expect(block.timestamp).toBeTruthy();
    expect(block.height).toBeTruthy();
    expect(block.numberOfTransactions >= 0).toBeTruthy();
    expect(block.totalAmount).toBeTruthy();
    expect(block.totalFee).toBeTruthy();
    expect(block.reward).toBeTruthy();
    expect(block.payloadLength >= 0).toBeTruthy();
    expect(block.payloadHash).toBeTruthy();
    expect(block.generatorPublicKey).toBeTruthy();
    expect(block.blockSignature).toBeTruthy();
    expect(block.confirmations).toBeTruthy();
    expect(block.totalForged).toBeTruthy();
    expect(block.generatorAddress).toBeTruthy();
    expect(block.previousBlockId).toBeTruthy();
  });

  it('should fetch 10 blocks', async () => {
    const query = `
      query blocks {
        blocks {
          id
        }
      }
    `;
    const data = await graphqlClient.request<{ blocks: any[] }>(query);
    expect(data.blocks.length).toBe(10);
  });

  describe('args', () => {
    describe('limit', () => {
      it('should limit', async () => {
        const query = `
          query blocks {
            blocks(limit: 50) {
              id
            }
          }
        `;
        const data = await graphqlClient.request<{ blocks: any[] }>(query);
        expect(data.blocks.length).toBe(50);
      });
    });

    describe('offset', () => {
      it('should offset', async () => {
        const compareQuery = `
          query blocks {
            blocks {
              id
            }
          }
        `;
        const query = `
          query blocks {
            blocks(offset: 5) {
              id
            }
          }
        `;
        const [compareData, data] = await Promise.all([
          graphqlClient.request<{ blocks: any[] }>(compareQuery),
          graphqlClient.request<{ blocks: any[] }>(query),
        ]);
        expect(data.blocks[0].id).not.toBe(compareData.blocks[0].id);
        expect(data.blocks[4].id).not.toBe(compareData.blocks[4].id);
      });
    });
  });
});
