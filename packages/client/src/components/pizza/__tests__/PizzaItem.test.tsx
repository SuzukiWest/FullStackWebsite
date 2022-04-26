import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { createTestPizza } from '../../../lib/test/helper/pizza';
import PizzaItem, { PizzaItemProps } from '../PizzaItem';
import React from 'react';
import { Pizza } from '../../../types/schema';

describe('PizzaItem', () => {
  const renderPizzaList = (props: PizzaItemProps) => {
    const view = renderWithProviders(<PizzaItem {...props} />);

    return {
      ...view,
      $getPrice: () => screen.getByTestId(/^pizza-price/),
      $getName: () => screen.getByTestId(/^pizza-name/),
      $getModifyButton: () => screen.getByRole('button'),
    };

  };
  const testPizza = createTestPizza()

  const props = {
    pizza: testPizza,
    id: testPizza.id,
    key: testPizza.name,
    selectPizza: jest.fn(),
    setCreate: jest.fn(),
  };

  test('should display all components of the pizza item', async () => {
    const { $getPrice, $getName, $getModifyButton } = renderPizzaList(props);

    expect($getPrice()).toBeVisible();
    expect($getName()).toBeVisible();
    expect($getModifyButton()).toBeVisible();
  });

  test('should call selectPizza when the pizza item is clicked', async () => {
    const { $getModifyButton } = renderPizzaList(props);

    userEvent.click($getModifyButton());

    expect(props.selectPizza).toHaveBeenCalledTimes(1);
  });
});
