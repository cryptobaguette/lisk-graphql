import { makeGraphqlRequest, liskClient } from '../../testUtils';

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
    const { errors, data } = await makeGraphqlRequest({ query });
    expect(errors).not.toBeTruthy();
    const block = data.blocks[0];
    expect(block).toEqual({
      id: expect.any(String),
      version: expect.any(Number),
      timestamp: expect.any(Number),
      height: expect.any(Number),
      numberOfTransactions: expect.any(Number),
      totalAmount: expect.any(String),
      totalFee: expect.any(String),
      reward: expect.any(String),
      payloadLength: expect.any(Number),
      payloadHash: expect.any(String),
      generatorPublicKey: expect.any(String),
      blockSignature: expect.any(String),
      confirmations: expect.any(Number),
      totalForged: expect.any(String),
      generatorAddress: expect.any(String),
      previousBlockId: expect.any(String),
    });
  });

  it('should match the lisk api response', async () => {
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
    const { errors, data } = await makeGraphqlRequest({ query });
    expect(errors).not.toBeTruthy();
    const block = data.blocks[0];
    const liskBlock = await liskClient.blocks
      .get({
        blockId: block.id,
      })
      .then((data: any) => data.data[0]);
    expect(liskBlock).toEqual({
      blockSignature: block.blockSignature,
      confirmations: block.confirmations,
      generatorAddress: block.generatorAddress,
      generatorPublicKey: block.generatorPublicKey,
      height: block.height,
      id: block.id,
      numberOfTransactions: block.numberOfTransactions,
      payloadHash: block.payloadHash,
      payloadLength: block.payloadLength,
      previousBlockId: block.previousBlockId,
      reward: block.reward,
      timestamp: block.timestamp,
      totalAmount: block.totalAmount,
      totalFee: block.totalFee,
      totalForged: block.totalForged,
      version: block.version,
    });
  });

  it('should fetch 10 blocks', async () => {
    const query = `
      query blocks {
        blocks {
          id
        }
      }
    `;
    const { errors, data } = await makeGraphqlRequest({ query });
    expect(errors).not.toBeTruthy();
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
        const { errors, data } = await makeGraphqlRequest({ query });
        expect(errors).not.toBeTruthy();
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
          makeGraphqlRequest({ query: compareQuery }),
          makeGraphqlRequest({ query }),
        ]);
        expect(compareData.errors).not.toBeTruthy();
        expect(data.errors).not.toBeTruthy();
        expect(data.data.blocks[0].id).not.toBe(compareData.data.blocks[0].id);
        expect(data.data.blocks[4].id).not.toBe(compareData.data.blocks[4].id);
      });
    });
  });
});
