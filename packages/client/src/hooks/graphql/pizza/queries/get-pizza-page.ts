import { gql } from '@apollo/client';

const GET_PIZZA_PAGE = gql`
  query pizzaPage($limit: Int) {
    page(limit: $limit) {
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
        priceCents
      }
    }
  }
`;
export { GET_PIZZA_PAGE };
