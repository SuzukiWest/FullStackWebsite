import { gql } from '@apollo/client';

export const UPDATE_PIZZA = gql`
  mutation ($updatePizzaInput: UpdatePizzaInput!) {
    updatePizza(input: $updatePizzainput) {
      id
      name
      description
      imgSrc
      toppings {
        id
        name
        priceCents
      }
      priceCents
    }
  }
`;
