export const typeDef = `
  type Transaction {
    # Unique identifier of the transaction. Derived from the transaction signature.
    id: String!

    # Amount of Lisk to be transferred in this transaction in readable format.
    amount: String!

    # Amount of Lisk to be transferred in this transaction in Beddows.
    amountRaw: BigInt!

    # Transaction fee associated with this transaction.
    fee: String!

    # Describes the Transaction type.
    type: Int!

    # The Id of the block, this transaction is included in.
    blockId: String

    # The transaction block where the transaction is included.
    block: Block

    # Time when the transaction was created. Unix Timestamp.
    timestamp: String!

    # Time when the transaction was created. Lisk Unix Timestamp.
    timestampRaw: String!

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
      # Offset of transactions.
      offset: Int
      # Fields to sort results by, default to BALANCE_ASC
      sort: SortTransactions
    ): [Transaction!]!

    # Gets transaction by provided id.
    transaction(
      # Id of transaction.
      id: ID!
    ): Transaction
  }

  enum SortTransactions {
    AMOUNT_ASC
    AMOUNT_DESC
  }
`;
