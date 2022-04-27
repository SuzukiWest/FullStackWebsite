import { screen, waitFor } from '@testing-library/react';
import { graphql } from 'msw';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { Pizza } from '../../../types';
import { server } from '../../../lib/test/msw-server';
import { createTestPizza, createTestTopping } from '../../../lib/test/helper/pizza';
import Pizzas from '../Pizzas';

describe('Pizzas', () => {
  const renderPizzaList = () => {
    //Render test PizzaList
    const view = renderWithProviders(<Pizzas />);

    return {
      ...view,

      //Functions to check render
      $findPizzaItems: () => screen.findAllByTestId(/^pizza-item/),
      $checkLoading: () => screen.queryByTestId(/pizza-loading/),
    };
  };

  const testTopping = createTestTopping();
  const mockPizzasQuery = (data: Partial<Pizza[]>) => {
    server.use(
      graphql.query('Pizzas', (_request, response, context) => {
        return response(
          context.data({
            loading: false,
            pizzas: [...data],
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

  const testPizza1 = createTestPizza({ toppings: [testTopping], priceCents: testTopping.priceCents });
  const testPizza2 = createTestPizza({ toppings: [testTopping], priceCents: testTopping.priceCents });

  const testPizzaList = [testPizza1, testPizza2];

  test('should display load screen and then list of 2 pizzas', async () => {
    await waitFor(() => {
      const { $checkLoading } = renderPizzaList();
      mockPizzasQuery(testPizzaList);

      expect($checkLoading()).toBeTruthy;
      expect($checkLoading()).toBeVisible;
    });

    const { $findPizzaItems } = renderPizzaList();
    await waitFor(() => expect($findPizzaItems()).resolves.toHaveLength(2));
  });
});
