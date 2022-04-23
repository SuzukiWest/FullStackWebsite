import { ObjectId } from 'mongodb';

import { Pizza } from 'src/application/schema/types/schema';
import { PizzaDocument, PizzaInp } from 'src/entities/pizza';
import { createMockTopping } from './topping.helper';

const createMockPizza = (data?: Partial<PizzaInp>): Pizza => {
  return {
    __typename: 'Pizza',
    id: new ObjectId(),
    name: 'Mock Pizza',
    description: 'Mock description',
    imgSrc: 'Mock image',
    toppings: [],
    priceCents: 0,
    ...data,
  };
};

const createMockPizzaInp = (data?: Partial<PizzaInp>): PizzaInp => {
  const mockTopping = createMockTopping();

  return {
    id: new ObjectId().toHexString(),
    name: 'Mock Pizza',
    description: 'Mock description',
    imgSrc: 'Mock image',
    toppingIds: [mockTopping.id],
    ...data,
  };
};

const createMockPizzaDocument = (data?: Partial<PizzaDocument>): PizzaDocument => {
  const mockTopping = createMockTopping();

  return {
    _id: new ObjectId(),
    name: 'Mock Pizza',
    description: 'Mock description',
    imgSrc: 'Mock image',
    toppingIds: [mockTopping.id],
    ...data,
  };
};

export { createMockPizza, createMockPizzaDocument, createMockPizzaInp };
