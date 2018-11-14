import { graphqlClient } from '../../testUtils';

describe('blocks', () => {
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
