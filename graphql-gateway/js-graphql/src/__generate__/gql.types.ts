export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Bit = {
  __typename?: 'Bit';
  content: Scalars['String'];
  /** Date format in ISO8601 */
  createAt: Scalars['String'];
  id: Scalars['ID'];
  likeGivers?: Maybe<Array<User>>;
  totalLike?: Maybe<Scalars['Int']>;
};

export type FindUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export enum Gender {
  Female = 'FEMALE',
  Hidden = 'HIDDEN',
  Male = 'MALE',
  Other = 'OTHER',
}

export type LoginInput = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  likeBit?: Maybe<Bit>;
  login?: Maybe<Token>;
  postBit?: Maybe<Bit>;
  register?: Maybe<User>;
  /** Update My Info */
  updateInfo?: Maybe<User>;
};

export type MutationLikeBitArgs = {
  id: Scalars['ID'];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationPostBitArgs = {
  content: Scalars['String'];
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationUpdateInfoArgs = {
  input: UpdateInfoInput;
};

export type Query = {
  __typename?: 'Query';
  bits?: Maybe<Array<Bit>>;
  findBit?: Maybe<Bit>;
  findUser?: Maybe<User>;
  /** Simple check about gateway connectivity, return OK */
  healthcheck: Scalars['String'];
  isLikedBit?: Maybe<Scalars['Boolean']>;
  /** Get current User */
  me?: Maybe<User>;
  showBits?: Maybe<Array<Bit>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};

export type QueryFindBitArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type QueryFindUserArgs = {
  input: FindUserInput;
};

export type QueryIsLikedBitArgs = {
  id: Scalars['ID'];
};

export type QueryShowBitsArgs = {
  following?: InputMaybe<Scalars['Boolean']>;
};

export type RegisterInput = {
  email: Scalars['String'];
  nickname?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type UpdateInfoInput = {
  gender?: InputMaybe<Gender>;
};

export type User = {
  __typename?: 'User';
  bits?: Maybe<Array<Bit>>;
  email: Scalars['String'];
  following?: Maybe<Array<User>>;
  id: Scalars['ID'];
  info?: Maybe<UserInfo>;
  /** User custom name, can duplicate */
  nickname?: Maybe<Scalars['String']>;
  /** Hashed password */
  password: Scalars['String'];
  /** Use for login and identify, unique */
  username: Scalars['String'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  gender?: Maybe<Gender>;
};
