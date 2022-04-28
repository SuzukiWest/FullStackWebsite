import { gql } from '@apollo/client';

const GET_PIZZA_PAGE = gql`
  query pizzaPage($input: QueryInput!) {
    pizzas(input: $input) {
      totalCount
      hasNextPage
      cursorPosition
      results {
        id
        name
        description
        imgSrc
        toppings {
          id
          name
          priceCents
        }
      }
    }
  }
`;
export { GET_PIZZA_PAGE };
