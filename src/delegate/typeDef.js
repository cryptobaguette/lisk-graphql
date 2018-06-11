exports.typeDef = `
  type Delegate {
    # The delegates’ username. A delegate chooses the username by registering a delegate on the Lisk network. It is unique and cannot be changed later.
    username: String!

    # The voters weight of the delegate. Represents the total amount of Lisk (in Beddows) that the delegates’ voters own. The voters weight decides which rank the delegate gets in relation to the other delegates and their voters weights.
    vote: BigInt!

    # Total sum of block rewards that the delegate has forged.
    rewards: String

    # Total number of blocks the delegate has forged.
    producedBlocks: Int

    # Total number of blocks the delegate has missed.
    missedBlocks: Int

    # Percentage of the voters weight, that the delegate owns in relation to the total supply of Lisk.
    # TODO approval: Int

    # Productivity rate. Percentage of successfully forged blocks (not missed) by the delegate.
    productivity: Float

    # Returns all votes received by a delegate.
    voters: [Account!]!

    # Returns all votes placed by an account.
    votes: [Account!]!

    # Number of votes that are already placed by the queried account.
    votesUsed: Int!

    # Number of votes that are available for the queried account. Derives from 101(max possible votes) - votesUsed(already used votes)
    votesAvailable: Int!

    # ---- Copy paste from accounts schema ----

    # The Lisk Address is the human readable representation of the accounts owners’ public key. It consists of 21 numbers followed by a big ‘L’ at the end.
    address: String!

    # The public key is derived from the private key of the owner of the account. It can be used to validate that the private key belongs to the owner, but does not provide access to the owners private key.
    publicKey: String!

    # The current balance of the account in Beddows.
    balance: BigInt!

    # The current unconfirmed balance of the account in Beddows. Includes unconfirmed transactions.
    unconfirmedBalance: BigInt!

    # If account enabled second signature, but it's still not confirmed.
    unconfirmedSignature: Boolean!

    # The second public key is derived from the second private key of an account, if the owner activated a second passphrase for her/his account.
    secondPublicKey: Boolean!

    # ---- End copy paste ----
  }

  extend type Query {
    # Gets list of delegates by provided filter.
    delegates(
      # Limit of delegates to add to response. Default to 100.
      limit: Int
      # Offset of delegates.
      offset: Int
    ): [Delegate!]!

    # Returns account information of a delegate.
    delegate(
      # Address of account.
      address: String
      # Public key of account.
      publicKey: String
    ): Delegate
  }
`;
