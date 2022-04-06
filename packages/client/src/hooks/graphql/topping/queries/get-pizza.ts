import { gql } from '@apollo/client';

export const GET_PIZZA = gql`
  query Get_Pizza($pizzaId: ObjectID!) {
    pizza(id: $pizzaId) {
      id
      name
      description
      ImgSrc
    }
  }
`;
