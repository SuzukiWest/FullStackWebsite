import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    ImgSrc: String!
    toppingIds: [ObjectID!]!
    toppings: [Topping!]
  }

  type Query {
    pizzas: [Pizza!]!
  }

  input PizzaQueryArgs {
    id: ObjectID!
  }
`;

export { typeDefs };
