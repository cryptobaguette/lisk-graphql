exports.typeDef = `
  type Block {
    # Unique identifier of the block. Derived from the block signature.
    id: ID!

    # Versioning for future upgrades of the lisk protocol.
    version: Int

    # Height of the network, when the block got forged. The height of the networks represents the number of blocks, that have been forged on the network since Genesis Block.
    height: Int!

    timestamp: Int!

    # Lisk Address of the delegate who forged the block.
    generatorAddress: String

    # Public key of th edelagte who forged the block.
    generatorPublicKey: String!

    # Bytesize of the payload hash.
    payloadLength: Int

    # Hash of the payload of the block. The payload of a block is comprised of the transactions the block contains. For each type of transaction exists a different maximum size for the payload.
    payloadHash: String

    # Derived from a SHA-256 hash of the block header, that is signed by the private key of the delegate who forged the block.
    blockSignature: String

    # Number of times that this Block has been confirmed by the network. By forging a new block on a chain, all former blocks in the chain get confirmed by the forging delegate.
    confirmations: Int

    # The id of the previous block of the chain.
    previousBlockId: String

    # The number of transactions processed in the block.
    numberOfTransactions: Int!

    # The total amount of Lisk transferred.
    totalAmount: Int!

    # The total amount of fees associated with the block.
    totalFee: Int!

    # The Lisk reward for the delegate.
    reward: Int!

    # Total amount of LSK that have been forged in this Block. Consists of fees and the reward.
    totalForged: String! # TODO BigInt

    generatorId: String!
  }

  extend type Query {
    # Gets all blocks by provided filter(s).
    blocks(
      # Limit of blocks to add to response. Default to 100.
      limit: Int
      # Offset of blocks.
      offset: Int
    ): [Block!]!

    # Gets block by provided id.
    block(
      # Id of block.
      id: ID!
    ): Block
  }
`;
