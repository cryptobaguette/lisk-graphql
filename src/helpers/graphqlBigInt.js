// This file is just a copy paste of the String implementation

const { GraphQLScalarType, Kind } = require('graphql');

function coerceString(value) {
  if (Array.isArray(value)) {
    throw new TypeError(`String cannot represent an array value: ${value}`);
  }
  return String(value);
}

exports.GraphQLBigInt = new GraphQLScalarType({
  name: 'BigInt',
  description:
    'The `BigInt` scalar type represents textual data, represented as UTF-8 ' +
    'character sequences. The String type is most often used by GraphQL to ' +
    'represent free-form human-readable text.',
  serialize: coerceString,
  parseValue: coerceString,
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? ast.value : undefined;
  },
});
