import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query Pizzas {
    pizzas {
      priceCents
      id
      name
      description
      ImgSrc
      toppings {
        id
        name
        priceCents
      }
    }
  }
`;

export { GET_PIZZAS };
