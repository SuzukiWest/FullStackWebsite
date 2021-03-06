import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    imgSrc: String!
    toppings: [Topping!]!
    priceCents: Int!
  }

  type GetPizzasResponse {
    totalCount: Int!
    hasNextPage: Boolean!
    cursorPosition: ObjectID!
    results: [Pizza!]!
  }

  type Query {
    page(limit: Int): GetPizzasResponse!
  }
  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza!
    deletePizza(input: DeletePizzaInput!): ObjectID!
    updatePizza(input: UpdatePizzaInput!): Pizza!
  }

  input CreatePizzaInput {
    name: String!
    description: String!
    imgSrc: String!
    toppingIds: [ObjectID!]!
  }

  input DeletePizzaInput {
    id: ObjectID!
  }

  input UpdatePizzaInput {
    id: ObjectID!
    name: String
    description: String
    imgSrc: String
    toppingIds: [ObjectID!]
  }
`;

export { typeDefs };
