import { ObjectId } from 'mongodb';

//DOUBLE CHECK THIS IS THE RIGHT TYPE - NOT FROM PROVIDERS
import { Pizza } from 'src/application/schema/types/schema';
import { PizzaDocument } from 'src/entities/pizza';

const createMockPizza = (data?: Partial<Pizza>): Pizza => {
  return {
    __typename: 'Pizza',
    id: new ObjectId().toHexString(),
    name: 'Pizza 1',
    description: 'description 1',
    ImgSrc: 'image 1',
    toppings: [], //Input ids for test
    priceCents: 250,
    ...data,
  };
};

const createMockPizzaDocument = (data?: Partial<PizzaDocument>): PizzaDocument => {
  return {
    id: new ObjectId(),
    name: 'Pizza 1',
    description: 'description 1',
    ImgSrc: 'image 1',
    toppingIds: [], //Input ids for test
    ...data,
  };
};

export { createMockPizza, createMockPizzaDocument };
