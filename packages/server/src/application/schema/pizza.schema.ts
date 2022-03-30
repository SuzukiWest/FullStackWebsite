import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    toppingIds: [Topping!]!
    ImgSrc: String!
  }

  type Query {
    pizzas: [Pizza!]!
  }
`;

export { typeDefs };
