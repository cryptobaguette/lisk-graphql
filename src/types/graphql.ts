export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents textual data, represented as UTF-8 character
   * sequences. The String type is most often used by GraphQL to represent free-form
   * human-readable text.
   */
  BigInt: any;
};

export type Account = {
  /** The Lisk Address is the human readable representation of the accounts owners’
   * public key. It consists of 21 numbers followed by a big ‘L’ at the end.
   */
  address: Scalars['String'];
  /** The delegates’ username. A delegate chooses the username by registering a
   * delegate on the Lisk network. It is unique and cannot be changed later.
   */
  name?: Maybe<Scalars['String']>;
  /** The public key is derived from the private key of the owner of the account. It
   * can be used to validate that the private key belongs to the owner, but does
   * not provide access to the owners private key.
   */
  publicKey: Scalars['String'];
  /** The current balance of the account in readable format. */
  balance: Scalars['BigInt'];
  /** The current balance of the account in Beddows. */
  balanceRaw: Scalars['BigInt'];
  /** The current unconfirmed balance of the account in Beddows. Includes unconfirmed transactions. */
  unconfirmedBalance: Scalars['BigInt'];
  /** The second public key is derived from the second private key of an account, if
   * the owner activated a second passphrase for her/his account.
   */
  secondPublicKey?: Maybe<Scalars['Boolean']>;
};

export type Block = {
  /** Unique identifier of the block. Derived from the block signature. */
  id: Scalars['ID'];
  /** Versioning for future upgrades of the lisk protocol. */
  version?: Maybe<Scalars['Int']>;
  /** Height of the network, when the block got forged. The height of the networks
   * represents the number of blocks, that have been forged on the network since Genesis Block.
   */
  height: Scalars['Int'];
  timestamp: Scalars['Int'];
  /** Lisk Address of the delegate who forged the block. */
  generatorAddress?: Maybe<Scalars['String']>;
  /** Public key of th edelagte who forged the block. */
  generatorPublicKey: Scalars['String'];
  /** Bytesize of the payload hash. */
  payloadLength?: Maybe<Scalars['Int']>;
  /** Hash of the payload of the block. The payload of a block is comprised of the
   * transactions the block contains. For each type of transaction exists a
   * different maximum size for the payload.
   */
  payloadHash?: Maybe<Scalars['String']>;
  /** Derived from a SHA-256 hash of the block header, that is signed by the private key of the delegate who forged the block. */
  blockSignature?: Maybe<Scalars['String']>;
  /** Number of times that this Block has been confirmed by the network. By forging
   * a new block on a chain, all former blocks in the chain get confirmed by the
   * forging delegate.
   */
  confirmations?: Maybe<Scalars['Int']>;
  /** The id of the previous block of the chain. */
  previousBlockId?: Maybe<Scalars['String']>;
  /** The number of transactions processed in the block. */
  numberOfTransactions: Scalars['Int'];
  /** The total amount of Lisk transferred. */
  totalAmount: Scalars['BigInt'];
  /** The total amount of fees associated with the block. */
  totalFee: Scalars['BigInt'];
  /** The Lisk reward for the delegate. */
  reward: Scalars['BigInt'];
  /** Total amount of LSK that have been forged in this Block. Consists of fees and the reward. */
  totalForged: Scalars['BigInt'];
};

export type Delegate = {
  /** The delegates’ username. A delegate chooses the username by registering a
   * delegate on the Lisk network. It is unique and cannot be changed later.
   */
  username: Scalars['String'];
  /** The voters weight of the delegate. Represents the total amount of Lisk (in
   * Beddows) that the delegates’ voters own. The voters weight decides which rank
   * the delegate gets in relation to the other delegates and their voters weights.
   */
  vote: Scalars['BigInt'];
  /** Total sum of block rewards that the delegate has forged. */
  rewards?: Maybe<Scalars['String']>;
  /** Total number of blocks the delegate has forged. */
  producedBlocks?: Maybe<Scalars['Int']>;
  /** Total number of blocks the delegate has missed. */
  missedBlocks?: Maybe<Scalars['Int']>;
  /** Productivity rate. Percentage of successfully forged blocks (not missed) by the delegate. */
  productivity?: Maybe<Scalars['Float']>;
  /** Returns all votes received by a delegate. */
  voters: Array<Account>;
  /** Returns all votes placed by an account. */
  votes: Array<Account>;
  /** Number of votes that are already placed by the queried account. */
  votesUsed: Scalars['Int'];
  /** Number of votes that are available for the queried account. Derives from
   * 101(max possible votes) - votesUsed(already used votes)
   */
  votesAvailable: Scalars['Int'];
  /** The Lisk Address is the human readable representation of the accounts owners’
   * public key. It consists of 21 numbers followed by a big ‘L’ at the end.
   */
  address: Scalars['String'];
  /** The delegates’ username. A delegate chooses the username by registering a
   * delegate on the Lisk network. It is unique and cannot be changed later.
   */
  name?: Maybe<Scalars['String']>;
  /** The public key is derived from the private key of the owner of the account. It
   * can be used to validate that the private key belongs to the owner, but does
   * not provide access to the owners private key.
   */
  publicKey: Scalars['String'];
  /** The current balance of the account in readable format. */
  balance: Scalars['BigInt'];
  /** The current balance of the account in Beddows. */
  balanceRaw: Scalars['BigInt'];
  /** The current unconfirmed balance of the account in Beddows. Includes unconfirmed transactions. */
  unconfirmedBalance: Scalars['BigInt'];
  /** The second public key is derived from the second private key of an account, if
   * the owner activated a second passphrase for her/his account.
   */
  secondPublicKey?: Maybe<Scalars['Boolean']>;
  voteWeight?: Maybe<Scalars['BigInt']>;
};

export type Query = {
  _?: Maybe<Scalars['String']>;
  /** Gets all accounts by provided filter(s). */
  accounts: Array<Account>;
  /** Returns account information of an address. */
  account?: Maybe<Account>;
  /** Gets all blocks by provided filter(s). */
  blocks: Array<Block>;
  /** Gets block by provided id. */
  block?: Maybe<Block>;
  /** Gets list of delegates by provided filter. */
  delegates: Array<Delegate>;
  /** Returns account information of a delegate. */
  delegate?: Maybe<Delegate>;
  /** Gets all transactions by provided filter(s). */
  transactions: Array<Transaction>;
  /** Gets transaction by provided id. */
  transaction?: Maybe<Transaction>;
};

export type QueryAccountsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort: SortAccounts;
};

export type QueryAccountArgs = {
  address?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
};

export type QueryBlocksArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryBlockArgs = {
  id: Scalars['ID'];
};

export type QueryDelegatesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryDelegateArgs = {
  address?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type QueryTransactionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortTransactions>;
};

export type QueryTransactionArgs = {
  id: Scalars['ID'];
};

export enum SortAccounts {
  BalanceAsc = 'BALANCE_ASC',
  BalanceDesc = 'BALANCE_DESC',
}

export enum SortTransactions {
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
}

export type Transaction = {
  /** Unique identifier of the transaction. Derived from the transaction signature. */
  id: Scalars['String'];
  /** Amount of Lisk to be transferred in this transaction in readable format. */
  amount: Scalars['String'];
  /** Amount of Lisk to be transferred in this transaction in Beddows. */
  amountRaw: Scalars['BigInt'];
  /** Transaction fee associated with this transaction. */
  fee: Scalars['String'];
  /** Describes the Transaction type. */
  type: Scalars['Int'];
  /** The Id of the block, this transaction is included in. */
  blockId?: Maybe<Scalars['String']>;
  /** The transaction block where the transaction is included. */
  block?: Maybe<Block>;
  /** Time when the transaction was created. Unix Timestamp. */
  timestamp: Scalars['String'];
  /** Time when the transaction was created. Lisk Unix Timestamp. */
  timestampRaw: Scalars['String'];
  /** Lisk Address of the Senders’ account. */
  senderId?: Maybe<Scalars['String']>;
  /** Lisk Senders’ account. */
  sender?: Maybe<Account>;
  /** Lisk Address of the Recipients’ account. */
  recipientId?: Maybe<Scalars['String']>;
  /** Lisk Recipients’ account. */
  recipient?: Maybe<Account>;
};

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {};
  String: Scalars['String'];
  Int: Scalars['Int'];
  SortAccounts: SortAccounts;
  Account: Account;
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  Block: Block;
  ID: Scalars['ID'];
  Delegate: Delegate;
  Float: Scalars['Float'];
  SortTransactions: SortTransactions;
  Transaction: Transaction;
};

export type AccountResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Account']
> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  balanceRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unconfirmedBalance?: Resolver<
    ResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  secondPublicKey?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
};

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BlockResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Block']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  generatorAddress?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  generatorPublicKey?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  payloadLength?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  payloadHash?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  blockSignature?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  confirmations?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  previousBlockId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  numberOfTransactions?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  totalAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reward?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalForged?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
};

export type DelegateResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Delegate']
> = {
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vote?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rewards?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  producedBlocks?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  missedBlocks?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  productivity?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  voters?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  votesUsed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  votesAvailable?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  balanceRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unconfirmedBalance?: Resolver<
    ResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  secondPublicKey?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  voteWeight?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Query']
> = {
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accounts?: Resolver<
    Array<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    QueryAccountsArgs
  >;
  account?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    QueryAccountArgs
  >;
  blocks?: Resolver<
    Array<ResolversTypes['Block']>,
    ParentType,
    ContextType,
    QueryBlocksArgs
  >;
  block?: Resolver<
    Maybe<ResolversTypes['Block']>,
    ParentType,
    ContextType,
    QueryBlockArgs
  >;
  delegates?: Resolver<
    Array<ResolversTypes['Delegate']>,
    ParentType,
    ContextType,
    QueryDelegatesArgs
  >;
  delegate?: Resolver<
    Maybe<ResolversTypes['Delegate']>,
    ParentType,
    ContextType,
    QueryDelegateArgs
  >;
  transactions?: Resolver<
    Array<ResolversTypes['Transaction']>,
    ParentType,
    ContextType,
    QueryTransactionsArgs
  >;
  transaction?: Resolver<
    Maybe<ResolversTypes['Transaction']>,
    ParentType,
    ContextType,
    QueryTransactionArgs
  >;
};

export type TransactionResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Transaction']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amountRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  block?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestampRaw?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  senderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  recipientId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  recipient?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Block?: BlockResolvers<ContextType>;
  Delegate?: DelegateResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
