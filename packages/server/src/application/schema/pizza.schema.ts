import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    ImgSrc: String!
    toppings: [Topping!]!
  }

  type Query {
    pizzas: [Pizza!]!
  }
`;

export { typeDefs };
