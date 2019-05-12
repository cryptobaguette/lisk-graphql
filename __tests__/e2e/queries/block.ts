import { graphqlClient, liskNetwork } from '../../testUtils';

const blockId =
  liskNetwork === 'testnet' ? '7669527049214991477' : '12015517279138151384';

describe('block', () => {
  describe('args', () => {
    describe('id', () => {
      it('should return null if block not found', async () => {
        const query = `
          query block {
            block(id: "test") {
              id
            }
          }
        `;
        const data = await graphqlClient.request<{ block: any }>(query);
        expect(data.block).toBeNull();
      });

      it('should fetch block with id', async () => {
        const query = `
          query block {
            block(id: "${blockId}") {
              id
            }
          }
        `;
        const data = await graphqlClient.request<{ block: any }>(query);
        expect(data.block.id).toBe(blockId);
      });
    });
  });
});
