import { ObjectId } from 'mongodb';

import { Pizza, Topping } from 'src/application/schema/types/schema';
import { PizzaDocument, PizzaInp } from 'src/entities/pizza';

//Avoid dependency between pizzaResolverTests and toppingHelper
//One way dependency from Pizza to Toppings
const createMockTopping = (data?: Partial<Topping>): Topping => {
  return {
    __typename: 'Topping',
    id: new ObjectId().toHexString(),
    name: 'Mock Tomato Sauce',
    priceCents: 900,
    ...data,
  };
};

const createMockPizza = (data?: Partial<Pizza>): Pizza => {
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
  return {
    id: new ObjectId().toHexString(),
    name: 'Mock Pizza',
    description: 'Mock description',
    imgSrc: 'Mock image',
    toppingIds: [],
    ...data,
  };
};

const createMockPizzaDocument = (data?: Partial<PizzaDocument>): PizzaDocument => {
  return {
    _id: new ObjectId(),
    name: 'Mock Pizza',
    description: 'Mock description',
    imgSrc: 'Mock image',
    toppingIds: [],
    ...data,
  };
};

export { createMockPizza, createMockPizzaDocument, createMockPizzaInp, createMockTopping };
