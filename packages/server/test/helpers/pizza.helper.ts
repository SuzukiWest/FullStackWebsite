import { ObjectId } from 'mongodb';

//DOUBLE CHECK THIS IS THE RIGHT TYPE - NOT FROM PROVIDERS
import { Pizza } from 'src/application/schema/types/schema';
import { PizzaDocument, PizzaInp } from 'src/entities/pizza';

const createMockPizza = (data?: Partial<Pizza>): Pizza => {
  return {
    __typename: 'Pizza',
    id: new ObjectId().toHexString(),
    name: 'Pizza 1',
    description: 'description 1',
    imgSrc: 'image 1',
    toppings: [],
    priceCents: 250,
    ...data,
  };
};

const createMockPizzaInp = (data?: Partial<PizzaInp>): PizzaInp => {
  return {
    id: new ObjectId().toHexString(),
    name: 'Pizza 1',
    description: 'description 1',
    imgSrc: 'image 1',
    toppingIds: [],
    ...data,
  };
};

const createMockPizzaDocument = (data?: Partial<PizzaDocument>): PizzaDocument => {
  return {
    id: new ObjectId(),
    name: 'Pizza 1',
    description: 'description 1',
    imgSrc: 'image 1',
    toppingIds: [],
    ...data,
  };
};

export { createMockPizza, createMockPizzaDocument, createMockPizzaInp };
