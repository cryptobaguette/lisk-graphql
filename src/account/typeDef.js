exports.typeDef = `
  type Account {
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
    secondPublicKey: Boolean
  }

  extend type Query {
    # Gets all accounts by provided filter(s).
    accounts(
      # Limit of accounts to add to response. Default to 10.
      limit: Int
      # Offset of accounts.
      offset: Int
      # Fields to sort results by, default to BALANCE_ASC
      sort: SortAccounts = BALANCE_ASC
    ): [Account!]!

    # Returns account information of an address.
    account(
      # Address of account.
      address: String
      # Public key of account.
      publicKey: String
    ): Account
  }

  enum SortAccounts {
    BALANCE_ASC
    BALANCE_DESC
  }
`;
