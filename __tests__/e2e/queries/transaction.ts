import { makeGraphqlRequest, liskClient } from '../../testUtils';

const transaction = {
  id: '9164476042848216525',
  blockId: '4595402514813331795',
  senderAddress: '11167359182026584069L',
  recipientAddress: '10774725955693999423L',
};

describe('transaction', () => {
  it('should contain the second signature', async () => {
    const transactionId = '9526405830938290772';
    const query = `
      query transaction {
        transaction(id: "${transactionId}") {
          id
          signSignature
        }
      }
    `;
    const { errors, data } = await makeGraphqlRequest({ query });
    expect(errors).not.toBeTruthy();
    const liskTransaction = await liskClient.transactions
      .get({
        id: transactionId,
      })
      .then((data: any) => data.data[0]);
    expect(data.transaction.signSignature).toBeTruthy();
    expect(data.transaction.signSignature).toBe(liskTransaction.signSignature);
  });

  it('should contain all the signatures for a multisignature transaction', async () => {
    const transactionId = '1341110619248769738';
    const query = `
      query transaction {
        transaction(id: "${transactionId}") {
          id
          signatures
        }
      }
    `;
    const { errors, data } = await makeGraphqlRequest({ query });
    expect(errors).not.toBeTruthy();
    const liskTransaction = await liskClient.transactions
      .get({
        id: transactionId,
      })
      .then((data: any) => data.data[0]);
    expect(data.transaction.signatures).toBeTruthy();
    expect(data.transaction.signatures).toEqual(liskTransaction.signatures);
  });

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
            transaction(id: "${transaction.id}") {
              id
            }
          }
        `;
        const { errors, data } = await makeGraphqlRequest({ query });
        expect(errors).not.toBeTruthy();
        expect(data.transaction.id).toBe(transaction.id);
      });
    });
  });

  describe('relations', () => {
    describe('block', () => {
      it('should fetch block associated to the transaction', async () => {
        const query = `
          query transaction {
            transaction(id: "${transaction.id}") {
              id
              block {
                id
              }
            }
          }
        `;
        const { errors, data } = await makeGraphqlRequest({ query });
        expect(errors).not.toBeTruthy();
        expect(data.transaction.id).toBe(transaction.id);
        expect(data.transaction.block).toBeTruthy();
        expect(data.transaction.block.id).toBe(transaction.blockId);
      });
    });

    describe('sender', () => {
      it('should fetch sender associated to the transaction', async () => {
        const query = `
          query transaction {
            transaction(id: "${transaction.id}") {
              id
              sender {
                address
              }
            }
          }
        `;
        const { errors, data } = await makeGraphqlRequest({ query });
        expect(errors).not.toBeTruthy();
        expect(data.transaction.id).toBe(transaction.id);
        expect(data.transaction.sender).toBeTruthy();
        expect(data.transaction.sender.address).toBe(transaction.senderAddress);
      });
    });

    describe('recipient', () => {
      it('should fetch recipient associated to the transaction', async () => {
        const query = `
          query transaction {
            transaction(id: "${transaction.id}") {
              id
              recipient {
                address
              }
            }
          }
        `;
        const { errors, data } = await makeGraphqlRequest({ query });
        expect(errors).not.toBeTruthy();
        expect(data.transaction.id).toBe(transaction.id);
        expect(data.transaction.recipient).toBeTruthy();
        expect(data.transaction.recipient.address).toBe(
          transaction.recipientAddress
        );
      });
    });
  });
});
