export type Maybe<T> = T | null;
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
  Long: any;
  ObjectID: any;
};

export type CreatePizzaInput = {
  ImgSrc: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  toppingIds: Array<Scalars['ObjectID']>;
};

export type CreateToppingInput = {
  name: Scalars['String'];
  priceCents: Scalars['Int'];
};

export type DeletePizzaInput = {
  id: Scalars['ObjectID'];
};

export type DeleteToppingInput = {
  id: Scalars['ObjectID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPizza: Pizza;
  createTopping: Topping;
  deletePizza: Scalars['ObjectID'];
  deleteTopping: Scalars['ObjectID'];
  updatePizza: Pizza;
  updateTopping: Topping;
};

export type MutationCreatePizzaArgs = {
  input: CreatePizzaInput;
};

export type MutationCreateToppingArgs = {
  input: CreateToppingInput;
};

export type MutationDeletePizzaArgs = {
  input: DeletePizzaInput;
};

export type MutationDeleteToppingArgs = {
  input: DeleteToppingInput;
};

export type MutationUpdatePizzaArgs = {
  input: UpdatePizzaInput;
};

export type MutationUpdateToppingArgs = {
  input: UpdateToppingInput;
};

export type Pizza = {
  __typename?: 'Pizza';
  ImgSrc: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ObjectID'];
  name: Scalars['String'];
  priceCents: Scalars['Int'];
  toppings: Array<Topping>;
};

export type Query = {
  __typename?: 'Query';
  pizzas: Array<Pizza>;
  toppings: Array<Topping>;
};

export type Topping = {
  __typename?: 'Topping';
  id: Scalars['ObjectID'];
  name: Scalars['String'];
  priceCents: Scalars['Int'];
};

export type ToppingQueryArgs = {
  id: Scalars['ObjectID'];
};

export type UpdatePizzaInput = {
  ImgSrc?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  name?: Maybe<Scalars['String']>;
  toppingIds?: Maybe<Array<Scalars['ObjectID']>>;
};

export type UpdateToppingInput = {
  id: Scalars['ObjectID'];
  name?: Maybe<Scalars['String']>;
  priceCents?: Maybe<Scalars['Int']>;
};
