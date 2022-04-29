import { ObjectId } from 'mongodb';

<<<<<<< HEAD
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
=======
//DOUBLE CHECK THIS IS THE RIGHT TYPE - NOT FROM PROVIDERS
import { Pizza } from 'src/application/schema/types/schema';
import { PizzaDocument } from 'src/entities/pizza';
>>>>>>> provider finished and half of resolver

const createMockPizza = (data?: Partial<Pizza>): Pizza => {
  return {
    __typename: 'Pizza',
<<<<<<< HEAD
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
=======
    id: new ObjectId().toHexString(),
    name: 'Pizza 1',
    description: 'description 1',
    ImgSrc: 'image 1',
    toppings: [], //Input ids for test
    priceCents: 250,
>>>>>>> provider finished and half of resolver
    ...data,
  };
};

const createMockPizzaDocument = (data?: Partial<PizzaDocument>): PizzaDocument => {
  return {
<<<<<<< HEAD
    _id: new ObjectId(),
    name: 'Mock Pizza',
    description: 'Mock description',
    imgSrc: 'Mock image',
    toppingIds: [],
=======
    id: new ObjectId(),
    name: 'Pizza 1',
    description: 'description 1',
    ImgSrc: 'image 1',
    toppingIds: [], //Input ids for test
>>>>>>> provider finished and half of resolver
    ...data,
  };
};

<<<<<<< HEAD
export { createMockPizza, createMockPizzaDocument, createMockPizzaInp, createMockTopping };
=======
export { createMockPizza, createMockPizzaDocument };
>>>>>>> provider finished and half of resolver
