const { graphql } = require('graphql');
const { schema } = require('../../src/graphql');

describe('graphql accounts', () => {
  it('should fetch accounts', async () => {
    const query = `
      query accounts {
        accounts {
          address
        }
      }
    `;
    const { data, errors } = await graphql(schema, query, {}, {});
    expect(errors).toBeUndefined();
    expect(data).toEqual({});
  });
});
