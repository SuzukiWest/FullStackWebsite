import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query Pizzas {
    pizzas {
      id
      name
      description
      ImgSrc
      toppingIds
    }
  }
`;

export { GET_PIZZAS };
