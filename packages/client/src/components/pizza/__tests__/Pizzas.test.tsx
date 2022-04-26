import { screen } from '@testing-library/react';
import { graphql } from 'msw';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { Pizza } from '../../../types';
import { server } from '../../../lib/test/msw-server';
import { createTestPizza } from '../../../lib/test/helper/pizza';
import PizzaItem from '../PizzaItem';
import Pizzas from '../Pizzas';


describe('Pizzas', () => {
/*
  const renderPizzaList = () => {
    const view = renderWithProviders(<PizzaItem />);
      ...view,

      $findPizzaItems: () => screen.findAllByTestId((/^data-testid/)),
      $findPizzaItemsButtons: () => screen
    };
  };
*/
  const mockPizzasQuery = (data: Partial<Pizza[]>) => {
    //await waitFor(() => {
      server.use(
        graphql.query('Pizzas', (_request, response, context) => {
          return response(
            context.data({
              loading: false,
              pizzas: [...data],
            })
          );
        })
      );
    //});
  };

  beforeEach(() => {
    const TestPizza1 = createTestPizza();
    const TestPizza2 = createTestPizza();
    const TestPizzaList = [TestPizza1, TestPizza2];
    const query = mockPizzasQuery(TestPizzaList);
  });

  test('should display a list of 2 pizzas', async () => {
    //const result = renderPizzaList();

   // expect(result).toHaveLength(2);
  });
});
