import { graphql } from 'graphql';
import { schema } from '@app/graphql';
import { liskClient } from '../../testUtils';

describe('transactions', () => {
  it('should fetch 10 transactions', async () => {
    const apiResponse = await liskClient.accounts.get();
    const query = `
      query transactions {
        transactions {
          id
        }
      }
    `;
    const { data, errors } = await graphql(schema, query, {}, {});
    expect(errors).toBeUndefined();
    expect(data!.accounts.length).toBe(10);
    expect(data!.accounts).toEqual(apiResponse.data);
  });
});
