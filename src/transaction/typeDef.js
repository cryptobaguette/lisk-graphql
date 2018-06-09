exports.typeDef = `
  type Transaction {
    # Unique identifier of the transaction. Derived from the transaction signature.
    id: String!

    # Amount of Lisk to be transferred in this transaction.
    amount: String!

    # Transaction fee associated with this transaction.
    fee: String!

    # Describes the Transaction type.
    type: Int!

    # The height of the network, at the moment where this transaction was included in the blockchain.
    height: Int

    # The Id of the block, this transaction is included in.
    blockId: String

    # Time when the transaction was created. Unix Timestamp.
    timestamp: String!

    # Lisk Address of the Senders’ account.
    senderId: String

    # Lisk Senders’ account.
    sender: Account

    # Lisk Address of the Recipients’ account.
    recipientId: String

    # Lisk Recipients’ account.
    recipient: Account

    # Derived from a SHA-256 hash of the transaction object, that is signed by the private key of the account who created the transaction.
    # TODO signature: String!

    # Contains the second signature, if the transaction is sent from an account with second passphrase activated.
    # TODO signSignature: String

    # TODO signatures

    # Number of times that this transaction has been confirmed by the network. By forging a new block on a chain, all former blocks and their contained transactions in the chain get confirmed by the forging delegate.
    confirmations: Int

    # The timestamp of the moment, where a node discovered a transaction for the first time.
    # TODO receivedAt: String

    # Number of times, a single transaction object has been broadcasted to another peer.
    # TODO relays: Int

    # Only present in transactions sent from a multisignature account, or transactions type 4 (multisignature registration). False, if the minimum amount of signatures to sign this transaction has not been reached yet. True, if the minimum amount of signatures has been reached.
    # TODO ready: Boolean
  }

  extend type Query {
    # Gets all transactions by provided filter(s).
    transactions(
      # Limit of transactions to add to response. Default to 100.
      limit: Int
    ): [Transaction!]!
  }
`;
