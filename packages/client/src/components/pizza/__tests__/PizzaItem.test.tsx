import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { createTestPizza, createTestTopping } from '../../../lib/test/helper/pizza';
import PizzaItem, { PizzaItemProps } from '../PizzaItem';
import React from 'react';

describe('PizzaItem', () => {
  const renderPizzaList = (props: PizzaItemProps) => {
    const view = renderWithProviders(<PizzaItem data-testid={'pizza-test'} {...props} />);

    return {
      ...view,
      PizzaItem: view.container,
      $checkTestPizza: () => screen.getByTestId(/^pizza-test$/),

      $getName: () => screen.getByTestId(/^pizza-name/),
      $getDescription: () => screen.getByTestId(/^pizza-description/),
      $getPrice: () => screen.getByTestId(/^pizza-price/),
      $getToppings: () => screen.getAllByTestId(/^pizza-toppingList/),
      $getImgSrc: () => screen.getByTestId(/^pizza-imgSrc/),

      $getButtons: () => screen.getByRole('button'),
    };
  };

  const testTopping = createTestTopping();
  const props = {
    pizza: createTestPizza({ toppings: [testTopping], priceCents: testTopping.priceCents }),
    choosePizza: jest.fn(),
  };

  test('should display all 5 components of the pizza item', async () => {
    const { ...out } = renderPizzaList(props);

    const name = out.$getName();
    const description = out.$getDescription();
    const price = out.$getPrice();
    const toppings = out.$getToppings();
    const img = out.$getImgSrc();

    expect(out.$checkTestPizza()).toContainElement(name);
    expect(out.$checkTestPizza()).toContainElement(description);
    expect(out.$checkTestPizza()).toContainElement(price);
    toppings.forEach((topping) => expect(out.$checkTestPizza()).toContainElement(topping));
    expect(out.$checkTestPizza()).toContainElement(img);

    expect(name).toBeVisible;
    expect(description).toBeVisible;
    expect(price).toBeVisible;
    expect(toppings).toBeVisible;
    expect(img).toBeVisible;
  });

  test('should call selectPizza when the pizza item is clicked', async () => {
    const { $getButtons } = renderPizzaList(props);

    userEvent.click($getButtons());

    expect(props.choosePizza).toHaveBeenCalledTimes(1);
  });
});
