export const typeDef = `
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
    totalAmount: BigInt!

    # The total amount of fees associated with the block.
    totalFee: BigInt!

    # The Lisk reward for the delegate.
    reward: BigInt!

    # Total amount of LSK that have been forged in this Block. Consists of fees and the reward.
    totalForged: BigInt!
  }

  enum SortBlocks {
    HEIGHT_ASC
    HEIGHT_DESC
    TOTAL_AMOUNT_ASC
    TOTAL_AMOUNT_DESC
  }

  extend type Query {
    # Gets all blocks by provided filter(s).
    blocks(
      # Limit of blocks to add to response. Default to 100.
      limit: Int
      # Offset of blocks.
      offset: Int
      # Fields to sort results by, default to BALANCE_ASC
      sort: SortBlocks = HEIGHT_DESC
    ): [Block!]!

    # Gets block by provided id.
    block(
      # Id of block.
      id: ID!
    ): Block
  }
`;
