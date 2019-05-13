import { makeGraphqlRequest, liskNetwork } from '../../testUtils';

const transactionId =
  liskNetwork === 'testnet' ? 'TODO' : '9164476042848216525';

describe('transaction', () => {
  describe('args', () => {
    describe('id', () => {
      it('should return null if transaction not found', async () => {
        const query = `
          query transaction {
            transaction(id: "test") {
              id
            }
          }
        `;
        const { errors, data } = await makeGraphqlRequest({ query });
        expect(errors).not.toBeTruthy();
        expect(data.transaction).toBeNull();
      });

      it('should fetch transaction with id', async () => {
        const query = `
          query transaction {
            transaction(id: "${transactionId}") {
              id
            }
          }
        `;
        const { errors, data } = await makeGraphqlRequest({ query });
        expect(errors).not.toBeTruthy();
        expect(data.transaction.id).toBe(transactionId);
      });
    });
  });
});
