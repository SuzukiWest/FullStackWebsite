import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    ImgSrc: String!
    toppings: [Topping!]!
    priceCents: Int!
  }

  type Query {
    pizzas: [Pizza!]!
  }

  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza!
    deletePizza(input: DeletePizzaInput!): ObjectID!
    updatePizza(input: UpdatePizzaInput!): Pizza!
  }

  input CreatePizzaInput {
    name: String!
    description: String!
    ImgSrc: String!
    toppingIds: [ObjectID!]!
  }

  input DeletePizzaInput {
    id: ObjectID!
  }

  input UpdatePizzaInput {
    id: ObjectID!
    name: String
    description: String
    ImgSrc: String
    toppingIds: [ObjectID!]
  }
`;

export { typeDefs };
