/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql';

export type Resolver<Result, Parent = any, Context = any, Args = never> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = never
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

// ====================================================
// START: Typescript template
// ====================================================

// ====================================================
// Scalars
// ====================================================

/** The `BigInt` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type BigInt = any;

// ====================================================
// Types
// ====================================================

export interface Query {
  _?: string | null;
  /** Gets all accounts by provided filter(s). */
  accounts: Account[];
  /** Returns account information of an address. */
  account?: Account | null;
  /** Gets all blocks by provided filter(s). */
  blocks: Block[];
  /** Gets block by provided id. */
  block?: Block | null;
  /** Gets list of delegates by provided filter. */
  delegates: Delegate[];
  /** Returns account information of a delegate. */
  delegate?: Delegate | null;
  /** Gets all transactions by provided filter(s). */
  transactions: Transaction[];
  /** Gets transaction by provided id. */
  transaction?: Transaction | null;
}

export interface Account {
  /** The Lisk Address is the human readable representation of the accounts owners’ public key. It consists of 21 numbers followed by a big ‘L’ at the end. */
  address: string;
  /** The delegates’ username. A delegate chooses the username by registering a delegate on the Lisk network. It is unique and cannot be changed later. */
  name?: string | null;
  /** The public key is derived from the private key of the owner of the account. It can be used to validate that the private key belongs to the owner, but does not provide access to the owners private key. */
  publicKey: string;
  /** The current balance of the account in readable format. */
  balance: BigInt;
  /** The current balance of the account in Beddows. */
  balanceRaw: BigInt;
  /** The current unconfirmed balance of the account in Beddows. Includes unconfirmed transactions. */
  unconfirmedBalance: BigInt;
  /** If account enabled second signature, but it's still not confirmed. */
  unconfirmedSignature: boolean;
  /** The second public key is derived from the second private key of an account, if the owner activated a second passphrase for her/his account. */
  secondPublicKey?: boolean | null;
}

export interface Block {
  /** Unique identifier of the block. Derived from the block signature. */
  id: string;
  /** Versioning for future upgrades of the lisk protocol. */
  version?: number | null;
  /** Height of the network, when the block got forged. The height of the networks represents the number of blocks, that have been forged on the network since Genesis Block. */
  height: number;

  timestamp: number;
  /** Lisk Address of the delegate who forged the block. */
  generatorAddress?: string | null;
  /** Public key of th edelagte who forged the block. */
  generatorPublicKey: string;
  /** Bytesize of the payload hash. */
  payloadLength?: number | null;
  /** Hash of the payload of the block. The payload of a block is comprised of the transactions the block contains. For each type of transaction exists a different maximum size for the payload. */
  payloadHash?: string | null;
  /** Derived from a SHA-256 hash of the block header, that is signed by the private key of the delegate who forged the block. */
  blockSignature?: string | null;
  /** Number of times that this Block has been confirmed by the network. By forging a new block on a chain, all former blocks in the chain get confirmed by the forging delegate. */
  confirmations?: number | null;
  /** The id of the previous block of the chain. */
  previousBlockId?: string | null;
  /** The number of transactions processed in the block. */
  numberOfTransactions: number;
  /** The total amount of Lisk transferred. */
  totalAmount: number;
  /** The total amount of fees associated with the block. */
  totalFee: number;
  /** The Lisk reward for the delegate. */
  reward: number;
  /** Total amount of LSK that have been forged in this Block. Consists of fees and the reward. */
  totalForged: BigInt;

  generatorId: string;
}

export interface Delegate {
  /** The delegates’ username. A delegate chooses the username by registering a delegate on the Lisk network. It is unique and cannot be changed later. */
  username: string;
  /** The voters weight of the delegate. Represents the total amount of Lisk (in Beddows) that the delegates’ voters own. The voters weight decides which rank the delegate gets in relation to the other delegates and their voters weights. */
  vote: BigInt;
  /** Total sum of block rewards that the delegate has forged. */
  rewards?: string | null;
  /** Total number of blocks the delegate has forged. */
  producedBlocks?: number | null;
  /** Total number of blocks the delegate has missed. */
  missedBlocks?: number | null;
  /** Productivity rate. Percentage of successfully forged blocks (not missed) by the delegate. */
  productivity?: number | null;
  /** Returns all votes received by a delegate. */
  voters: Account[];
  /** Returns all votes placed by an account. */
  votes: Account[];
  /** Number of votes that are already placed by the queried account. */
  votesUsed: number;
  /** Number of votes that are available for the queried account. Derives from 101(max possible votes) - votesUsed(already used votes) */
  votesAvailable: number;
  /** The Lisk Address is the human readable representation of the accounts owners’ public key. It consists of 21 numbers followed by a big ‘L’ at the end. */
  address: string;
  /** The delegates’ username. A delegate chooses the username by registering a delegate on the Lisk network. It is unique and cannot be changed later. */
  name?: string | null;
  /** The public key is derived from the private key of the owner of the account. It can be used to validate that the private key belongs to the owner, but does not provide access to the owners private key. */
  publicKey: string;
  /** The current balance of the account in readable format. */
  balance: BigInt;
  /** The current balance of the account in Beddows. */
  balanceRaw: BigInt;
  /** The current unconfirmed balance of the account in Beddows. Includes unconfirmed transactions. */
  unconfirmedBalance: BigInt;
  /** If account enabled second signature, but it's still not confirmed. */
  unconfirmedSignature: boolean;
  /** The second public key is derived from the second private key of an account, if the owner activated a second passphrase for her/his account. */
  secondPublicKey?: boolean | null;

  voteWeight?: BigInt | null;
}

export interface Transaction {
  /** Unique identifier of the transaction. Derived from the transaction signature. */
  id: string;
  /** Amount of Lisk to be transferred in this transaction in readable format. */
  amount: string;
  /** Amount of Lisk to be transferred in this transaction in Beddows. */
  amountRaw: BigInt;
  /** Transaction fee associated with this transaction. */
  fee: string;
  /** Describes the Transaction type. */
  type: number;
  /** The height of the network, at the moment where this transaction was included in the blockchain. */
  height?: number | null;
  /** The Id of the block, this transaction is included in. */
  blockId?: string | null;
  /** The transaction block where the transaction is included. */
  block?: Block | null;
  /** Time when the transaction was created. Unix Timestamp. */
  timestamp: string;
  /** Time when the transaction was created. Lisk Unix Timestamp. */
  timestampRaw: string;
  /** Lisk Address of the Senders’ account. */
  senderId?: string | null;
  /** Lisk Senders’ account. */
  sender?: Account | null;
  /** Lisk Address of the Recipients’ account. */
  recipientId?: string | null;
  /** Lisk Recipients’ account. */
  recipient?: Account | null;
  /** Number of times that this transaction has been confirmed by the network. By forging a new block on a chain, all former blocks and their contained transactions in the chain get confirmed by the forging delegate. */
  confirmations?: number | null;
}

// ====================================================
// Arguments
// ====================================================

export interface AccountsQueryArgs {
  /** Limit of accounts to add to response. Default to 10. */
  limit?: number | null;
  /** Offset of accounts. */
  offset?: number | null;
  /** Fields to sort results by, default to BALANCE_ASC */
  sort?: SortAccounts | null;
}
export interface AccountQueryArgs {
  /** Address of account. */
  address?: string | null;
  /** Public key of account. */
  publicKey?: string | null;
}
export interface BlocksQueryArgs {
  /** Limit of blocks to add to response. Default to 100. */
  limit?: number | null;
  /** Offset of blocks. */
  offset?: number | null;
}
export interface BlockQueryArgs {
  /** Id of block. */
  id: string;
}
export interface DelegatesQueryArgs {
  /** Limit of delegates to add to response. Default to 100. */
  limit?: number | null;
  /** Offset of delegates. */
  offset?: number | null;
}
export interface DelegateQueryArgs {
  /** Address of account. */
  address?: string | null;
  /** Public key of account. */
  publicKey?: string | null;
  /** Username of account. */
  username?: string | null;
}
export interface TransactionsQueryArgs {
  /** Limit of transactions to add to response. Default to 100. */
  limit?: number | null;
  /** Offset of transactions. */
  offset?: number | null;
  /** Fields to sort results by, default to BALANCE_ASC */
  sort?: SortTransactions | null;
}
export interface TransactionQueryArgs {
  /** Id of transaction. */
  id: string;
}

// ====================================================
// Enums
// ====================================================

export enum SortAccounts {
  BALANCE_ASC = 'BALANCE_ASC',
  BALANCE_DESC = 'BALANCE_DESC',
}

export enum SortTransactions {
  AMOUNT_ASC = 'AMOUNT_ASC',
  AMOUNT_DESC = 'AMOUNT_DESC',
}

// ====================================================
// END: Typescript template
// ====================================================

// ====================================================
// Resolvers
// ====================================================

export namespace QueryResolvers {
  export interface Resolvers<Context = any, TypeParent = never> {
    _?: Resolver<string | null, TypeParent, Context>;
    /** Gets all accounts by provided filter(s). */
    accounts?: AccountsResolver<Account[], TypeParent, Context>;
    /** Returns account information of an address. */
    account?: AccountResolver<Account | null, TypeParent, Context>;
    /** Gets all blocks by provided filter(s). */
    blocks?: BlocksResolver<Block[], TypeParent, Context>;
    /** Gets block by provided id. */
    block?: BlockResolver<Block | null, TypeParent, Context>;
    /** Gets list of delegates by provided filter. */
    delegates?: DelegatesResolver<Delegate[], TypeParent, Context>;
    /** Returns account information of a delegate. */
    delegate?: DelegateResolver<Delegate | null, TypeParent, Context>;
    /** Gets all transactions by provided filter(s). */
    transactions?: TransactionsResolver<Transaction[], TypeParent, Context>;
    /** Gets transaction by provided id. */
    transaction?: TransactionResolver<Transaction | null, TypeParent, Context>;
  }

  // export type Resolver<
  //   R = string | null,
  //   Parent = never,
  //   Context = any
  // > = Resolver<R, Parent, Context>;
  export type AccountsResolver<
    R = Account[],
    Parent = never,
    Context = any
  > = Resolver<R, Parent, Context, AccountsArgs>;
  export interface AccountsArgs {
    /** Limit of accounts to add to response. Default to 10. */
    limit?: number | null;
    /** Offset of accounts. */
    offset?: number | null;
    /** Fields to sort results by, default to BALANCE_ASC */
    sort?: SortAccounts | null;
  }

  export type AccountResolver<
    R = Account | null,
    Parent = never,
    Context = any
  > = Resolver<R, Parent, Context, AccountArgs>;
  export interface AccountArgs {
    /** Address of account. */
    address?: string | null;
    /** Public key of account. */
    publicKey?: string | null;
  }

  export type BlocksResolver<
    R = Block[],
    Parent = never,
    Context = any
  > = Resolver<R, Parent, Context, BlocksArgs>;
  export interface BlocksArgs {
    /** Limit of blocks to add to response. Default to 100. */
    limit?: number | null;
    /** Offset of blocks. */
    offset?: number | null;
  }

  export type BlockResolver<
    R = Block | null,
    Parent = never,
    Context = any
  > = Resolver<R, Parent, Context, BlockArgs>;
  export interface BlockArgs {
    /** Id of block. */
    id: string;
  }

  export type DelegatesResolver<
    R = Delegate[],
    Parent = never,
    Context = any
  > = Resolver<R, Parent, Context, DelegatesArgs>;
  export interface DelegatesArgs {
    /** Limit of delegates to add to response. Default to 100. */
    limit?: number | null;
    /** Offset of delegates. */
    offset?: number | null;
  }

  export type DelegateResolver<
    R = Delegate | null,
    Parent = never,
    Context = any
  > = Resolver<R, Parent, Context, DelegateArgs>;
  export interface DelegateArgs {
    /** Address of account. */
    address?: string | null;
    /** Public key of account. */
    publicKey?: string | null;
    /** Username of account. */
    username?: string | null;
  }

  export type TransactionsResolver<
    R = Transaction[],
    Parent = never,
    Context = any
  > = Resolver<R, Parent, Context, TransactionsArgs>;
  export interface TransactionsArgs {
    /** Limit of transactions to add to response. Default to 100. */
    limit?: number | null;
    /** Offset of transactions. */
    offset?: number | null;
    /** Fields to sort results by, default to BALANCE_ASC */
    sort?: SortTransactions | null;
  }

  export type TransactionResolver<
    R = Transaction | null,
    Parent = never,
    Context = any
  > = Resolver<R, Parent, Context, TransactionArgs>;
  export interface TransactionArgs {
    /** Id of transaction. */
    id: string;
  }
}

export namespace AccountResolvers {
  export interface Resolvers<Context = any, TypeParent = Account> {
    /** The Lisk Address is the human readable representation of the accounts owners’ public key. It consists of 21 numbers followed by a big ‘L’ at the end. */
    address?: AddressResolver<string, TypeParent, Context>;
    /** The delegates’ username. A delegate chooses the username by registering a delegate on the Lisk network. It is unique and cannot be changed later. */
    name?: NameResolver<string | null, TypeParent, Context>;
    /** The public key is derived from the private key of the owner of the account. It can be used to validate that the private key belongs to the owner, but does not provide access to the owners private key. */
    publicKey?: PublicKeyResolver<string, TypeParent, Context>;
    /** The current balance of the account in readable format. */
    balance?: BalanceResolver<BigInt, TypeParent, Context>;
    /** The current balance of the account in Beddows. */
    balanceRaw?: BalanceRawResolver<BigInt, TypeParent, Context>;
    /** The current unconfirmed balance of the account in Beddows. Includes unconfirmed transactions. */
    unconfirmedBalance?: UnconfirmedBalanceResolver<
      BigInt,
      TypeParent,
      Context
    >;
    /** If account enabled second signature, but it's still not confirmed. */
    unconfirmedSignature?: UnconfirmedSignatureResolver<
      boolean,
      TypeParent,
      Context
    >;
    /** The second public key is derived from the second private key of an account, if the owner activated a second passphrase for her/his account. */
    secondPublicKey?: SecondPublicKeyResolver<
      boolean | null,
      TypeParent,
      Context
    >;
  }

  export type AddressResolver<
    R = string,
    Parent = Account,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string | null,
    Parent = Account,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PublicKeyResolver<
    R = string,
    Parent = Account,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type BalanceResolver<
    R = BigInt,
    Parent = Account,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type BalanceRawResolver<
    R = BigInt,
    Parent = Account,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UnconfirmedBalanceResolver<
    R = BigInt,
    Parent = Account,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UnconfirmedSignatureResolver<
    R = boolean,
    Parent = Account,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type SecondPublicKeyResolver<
    R = boolean | null,
    Parent = Account,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace BlockResolvers {
  export interface Resolvers<Context = any, TypeParent = Block> {
    /** Unique identifier of the block. Derived from the block signature. */
    id?: IdResolver<string, TypeParent, Context>;
    /** Versioning for future upgrades of the lisk protocol. */
    version?: VersionResolver<number | null, TypeParent, Context>;
    /** Height of the network, when the block got forged. The height of the networks represents the number of blocks, that have been forged on the network since Genesis Block. */
    height?: HeightResolver<number, TypeParent, Context>;

    timestamp?: TimestampResolver<number, TypeParent, Context>;
    /** Lisk Address of the delegate who forged the block. */
    generatorAddress?: GeneratorAddressResolver<
      string | null,
      TypeParent,
      Context
    >;
    /** Public key of th edelagte who forged the block. */
    generatorPublicKey?: GeneratorPublicKeyResolver<
      string,
      TypeParent,
      Context
    >;
    /** Bytesize of the payload hash. */
    payloadLength?: PayloadLengthResolver<number | null, TypeParent, Context>;
    /** Hash of the payload of the block. The payload of a block is comprised of the transactions the block contains. For each type of transaction exists a different maximum size for the payload. */
    payloadHash?: PayloadHashResolver<string | null, TypeParent, Context>;
    /** Derived from a SHA-256 hash of the block header, that is signed by the private key of the delegate who forged the block. */
    blockSignature?: BlockSignatureResolver<string | null, TypeParent, Context>;
    /** Number of times that this Block has been confirmed by the network. By forging a new block on a chain, all former blocks in the chain get confirmed by the forging delegate. */
    confirmations?: ConfirmationsResolver<number | null, TypeParent, Context>;
    /** The id of the previous block of the chain. */
    previousBlockId?: PreviousBlockIdResolver<
      string | null,
      TypeParent,
      Context
    >;
    /** The number of transactions processed in the block. */
    numberOfTransactions?: NumberOfTransactionsResolver<
      number,
      TypeParent,
      Context
    >;
    /** The total amount of Lisk transferred. */
    totalAmount?: TotalAmountResolver<number, TypeParent, Context>;
    /** The total amount of fees associated with the block. */
    totalFee?: TotalFeeResolver<number, TypeParent, Context>;
    /** The Lisk reward for the delegate. */
    reward?: RewardResolver<number, TypeParent, Context>;
    /** Total amount of LSK that have been forged in this Block. Consists of fees and the reward. */
    totalForged?: TotalForgedResolver<BigInt, TypeParent, Context>;

    generatorId?: GeneratorIdResolver<string, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Block, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type VersionResolver<
    R = number | null,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type HeightResolver<
    R = number,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TimestampResolver<
    R = number,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type GeneratorAddressResolver<
    R = string | null,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type GeneratorPublicKeyResolver<
    R = string,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PayloadLengthResolver<
    R = number | null,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PayloadHashResolver<
    R = string | null,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type BlockSignatureResolver<
    R = string | null,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ConfirmationsResolver<
    R = number | null,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PreviousBlockIdResolver<
    R = string | null,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NumberOfTransactionsResolver<
    R = number,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TotalAmountResolver<
    R = number,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TotalFeeResolver<
    R = number,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RewardResolver<
    R = number,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TotalForgedResolver<
    R = BigInt,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type GeneratorIdResolver<
    R = string,
    Parent = Block,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace DelegateResolvers {
  export interface Resolvers<Context = any, TypeParent = Delegate> {
    /** The delegates’ username. A delegate chooses the username by registering a delegate on the Lisk network. It is unique and cannot be changed later. */
    username?: UsernameResolver<string, TypeParent, Context>;
    /** The voters weight of the delegate. Represents the total amount of Lisk (in Beddows) that the delegates’ voters own. The voters weight decides which rank the delegate gets in relation to the other delegates and their voters weights. */
    vote?: VoteResolver<BigInt, TypeParent, Context>;
    /** Total sum of block rewards that the delegate has forged. */
    rewards?: RewardsResolver<string | null, TypeParent, Context>;
    /** Total number of blocks the delegate has forged. */
    producedBlocks?: ProducedBlocksResolver<number | null, TypeParent, Context>;
    /** Total number of blocks the delegate has missed. */
    missedBlocks?: MissedBlocksResolver<number | null, TypeParent, Context>;
    /** Productivity rate. Percentage of successfully forged blocks (not missed) by the delegate. */
    productivity?: ProductivityResolver<number | null, TypeParent, Context>;
    /** Returns all votes received by a delegate. */
    voters?: VotersResolver<Account[], TypeParent, Context>;
    /** Returns all votes placed by an account. */
    votes?: VotesResolver<Account[], TypeParent, Context>;
    /** Number of votes that are already placed by the queried account. */
    votesUsed?: VotesUsedResolver<number, TypeParent, Context>;
    /** Number of votes that are available for the queried account. Derives from 101(max possible votes) - votesUsed(already used votes) */
    votesAvailable?: VotesAvailableResolver<number, TypeParent, Context>;
    /** The Lisk Address is the human readable representation of the accounts owners’ public key. It consists of 21 numbers followed by a big ‘L’ at the end. */
    address?: AddressResolver<string, TypeParent, Context>;
    /** The delegates’ username. A delegate chooses the username by registering a delegate on the Lisk network. It is unique and cannot be changed later. */
    name?: NameResolver<string | null, TypeParent, Context>;
    /** The public key is derived from the private key of the owner of the account. It can be used to validate that the private key belongs to the owner, but does not provide access to the owners private key. */
    publicKey?: PublicKeyResolver<string, TypeParent, Context>;
    /** The current balance of the account in readable format. */
    balance?: BalanceResolver<BigInt, TypeParent, Context>;
    /** The current balance of the account in Beddows. */
    balanceRaw?: BalanceRawResolver<BigInt, TypeParent, Context>;
    /** The current unconfirmed balance of the account in Beddows. Includes unconfirmed transactions. */
    unconfirmedBalance?: UnconfirmedBalanceResolver<
      BigInt,
      TypeParent,
      Context
    >;
    /** If account enabled second signature, but it's still not confirmed. */
    unconfirmedSignature?: UnconfirmedSignatureResolver<
      boolean,
      TypeParent,
      Context
    >;
    /** The second public key is derived from the second private key of an account, if the owner activated a second passphrase for her/his account. */
    secondPublicKey?: SecondPublicKeyResolver<
      boolean | null,
      TypeParent,
      Context
    >;

    voteWeight?: VoteWeightResolver<BigInt | null, TypeParent, Context>;
  }

  export type UsernameResolver<
    R = string,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type VoteResolver<
    R = BigInt,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RewardsResolver<
    R = string | null,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ProducedBlocksResolver<
    R = number | null,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type MissedBlocksResolver<
    R = number | null,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ProductivityResolver<
    R = number | null,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type VotersResolver<
    R = Account[],
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type VotesResolver<
    R = Account[],
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type VotesUsedResolver<
    R = number,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type VotesAvailableResolver<
    R = number,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AddressResolver<
    R = string,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string | null,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PublicKeyResolver<
    R = string,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type BalanceResolver<
    R = BigInt,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type BalanceRawResolver<
    R = BigInt,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UnconfirmedBalanceResolver<
    R = BigInt,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UnconfirmedSignatureResolver<
    R = boolean,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type SecondPublicKeyResolver<
    R = boolean | null,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type VoteWeightResolver<
    R = BigInt | null,
    Parent = Delegate,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace TransactionResolvers {
  export interface Resolvers<Context = any, TypeParent = Transaction> {
    /** Unique identifier of the transaction. Derived from the transaction signature. */
    id?: IdResolver<string, TypeParent, Context>;
    /** Amount of Lisk to be transferred in this transaction in readable format. */
    amount?: AmountResolver<string, TypeParent, Context>;
    /** Amount of Lisk to be transferred in this transaction in Beddows. */
    amountRaw?: AmountRawResolver<BigInt, TypeParent, Context>;
    /** Transaction fee associated with this transaction. */
    fee?: FeeResolver<string, TypeParent, Context>;
    /** Describes the Transaction type. */
    type?: TypeResolver<number, TypeParent, Context>;
    /** The height of the network, at the moment where this transaction was included in the blockchain. */
    height?: HeightResolver<number | null, TypeParent, Context>;
    /** The Id of the block, this transaction is included in. */
    blockId?: BlockIdResolver<string | null, TypeParent, Context>;
    /** The transaction block where the transaction is included. */
    block?: BlockResolver<Block | null, TypeParent, Context>;
    /** Time when the transaction was created. Unix Timestamp. */
    timestamp?: TimestampResolver<string, TypeParent, Context>;
    /** Time when the transaction was created. Lisk Unix Timestamp. */
    timestampRaw?: TimestampRawResolver<string, TypeParent, Context>;
    /** Lisk Address of the Senders’ account. */
    senderId?: SenderIdResolver<string | null, TypeParent, Context>;
    /** Lisk Senders’ account. */
    sender?: SenderResolver<Account | null, TypeParent, Context>;
    /** Lisk Address of the Recipients’ account. */
    recipientId?: RecipientIdResolver<string | null, TypeParent, Context>;
    /** Lisk Recipients’ account. */
    recipient?: RecipientResolver<Account | null, TypeParent, Context>;
    /** Number of times that this transaction has been confirmed by the network. By forging a new block on a chain, all former blocks and their contained transactions in the chain get confirmed by the forging delegate. */
    confirmations?: ConfirmationsResolver<number | null, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AmountResolver<
    R = string,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AmountRawResolver<
    R = BigInt,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type FeeResolver<
    R = string,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TypeResolver<
    R = number,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type HeightResolver<
    R = number | null,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type BlockIdResolver<
    R = string | null,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type BlockResolver<
    R = Block | null,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TimestampResolver<
    R = string,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TimestampRawResolver<
    R = string,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type SenderIdResolver<
    R = string | null,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type SenderResolver<
    R = Account | null,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RecipientIdResolver<
    R = string | null,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RecipientResolver<
    R = Account | null,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ConfirmationsResolver<
    R = number | null,
    Parent = Transaction,
    Context = any
  > = Resolver<R, Parent, Context>;
}
