import { screen, waitFor } from '@testing-library/react';
import { graphql } from 'msw';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { Pizza } from '../../../types';
import { server } from '../../../lib/test/msw-server';
import { createTestPizza, createTestTopping } from '../../../lib/test/helper/pizza';
import Pizzas from '../Pizzas';
import userEvent from '@testing-library/user-event';

const testTopping = createTestTopping();
const testPizza1 = createTestPizza({ toppings: [testTopping], priceCents: testTopping.priceCents });
const testPizza2 = createTestPizza({ toppings: [testTopping], priceCents: testTopping.priceCents });
const testPizza3 = createTestPizza({ toppings: [testTopping], priceCents: testTopping.priceCents });

const testPizzaList = [testPizza1, testPizza2, testPizza3];
describe('Pizzas', () => {
  const renderPizzaList = () => {
    //Render test PizzaList
    const view = renderWithProviders(<Pizzas />);

    return {
      ...view,

      //Functions to check render
      $findPizzaItems: () => screen.findAllByTestId(/^pizza-item/),
      $checkLoading: () => screen.findByTestId(/pizza-loading/),
      //Buttons
      $createButton: () => screen.findByTestId(/pizza-createButton/),
      $nextPageButton: () => screen.findByTestId(/pizza-getPage/),
    };
  };

  const mockPageQuery = (data: Partial<Pizza[]>) => {
    server.use(
      graphql.query('pizzaPage', (request, response, context) => {
        return response(
          context.data({
            loading: false,
            page: {
              totalCount: 1,
              hasNextPage: false,
              cursorPosition: testPizza1.id,
              results: [...data].slice(0, 1),
            },
          })
        );
      }),
      graphql.query('Toppings', (_request, response, context) => {
        return response(
          context.data({
            loading: false,
            toppings: [testTopping],
          })
        );
      })
    );
  };

  const loadPizzasQuery = (data: Partial<Pizza[]>) => {
    server.use(
      graphql.query('pizzaPage', (_request, response, context) => {
        return response(
          context.data({
            loading: true,
            page: {
              totalCount: 1,
              hasNextPage: false,
              cursorPosition: testPizza1.id,
              results: [...data].slice(0, 2),
            },
          })
        );
      }),
      graphql.query('Toppings', (_request, response, context) => {
        return response(
          context.data({
            loading: true,
            toppings: [testTopping],
          })
        );
      })
    );
  };

  test('should display load screen', async () => {
    await waitFor(() => {
      loadPizzasQuery(testPizzaList);
      const { $checkLoading } = renderPizzaList();

      expect($checkLoading()).toBeTruthy;
      expect($checkLoading()).toBeVisible;
    });
  });

  test('should display 2 pizzaItems', async () => {
    mockPageQuery(testPizzaList);

    const { $findPizzaItems } = renderPizzaList();
    await waitFor(() => expect($findPizzaItems()).resolves.toHaveLength(1));
  });
});
