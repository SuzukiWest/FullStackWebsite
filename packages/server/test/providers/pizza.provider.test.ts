<<<<<<< HEAD
//Helper mock functions
import { mockSortToArray } from '../helpers/mongo.helper';
import { createMockPizzaDocument, createMockTopping } from '../helpers/pizza.helper';
import { reveal, stub } from 'jest-auto-stub';

//Provider/Type imports
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { PizzaDocument, toPizzaObject } from '../../src/entities/pizza';
import { PizzaProvider } from '../../src/application/providers/pizzas/pizza.provider';
import { Collection } from 'mongodb';
=======
import { Collection } from 'mongodb';

import { reveal, stub } from 'jest-auto-stub';
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { mockSortToArray } from '../helpers/mongo.helper';
import { createMockPizzaDocument } from 'test/helpers/pizza.helper';
import { PizzaDocument, toPizzaObject } from 'src/entities/pizza';
import { PizzaProvider } from 'src/application/providers/pizzas/pizza.provider';
>>>>>>> provider finished and half of resolver

const stubPizzaCollection = stub<Collection<PizzaDocument>>();
const stubToppingProvider = stub<ToppingProvider>();

const pizzaProvider = new PizzaProvider(stubPizzaCollection, stubToppingProvider);

beforeEach(jest.clearAllMocks);

<<<<<<< HEAD
//Test Pizza Provider
describe('pizzaProvider', (): void => {
  const mockTopping = createMockTopping();
  const mockPizzaDocument = createMockPizzaDocument({ toppingIds: [mockTopping.id] });
  const mockPizza = toPizzaObject(mockPizzaDocument);
  //Test Pizzas Query
=======
//Test Pizzas Query
describe('pizzaProvider', (): void => {
  const mockPizzaDocument = createMockPizzaDocument();
  const mockPizza = toPizzaObject(mockPizzaDocument);
>>>>>>> provider finished and half of resolver

  describe('getPizzas', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).find.mockImplementation(mockSortToArray([mockPizzaDocument]));
    });

    test('should call find once', async () => {
      await pizzaProvider.getPizzas();

      expect(stubPizzaCollection.find).toHaveBeenCalledTimes(1);
    });

<<<<<<< HEAD
    test('should get all pizzas', async () => {
=======
    test('should get all toppings', async () => {
>>>>>>> provider finished and half of resolver
      const result = await pizzaProvider.getPizzas();

      expect(result).toEqual([mockPizza]);
    });
  });

<<<<<<< HEAD
  //Test Create Pizza
  describe('createPizza', (): void => {
    const createPizza = createMockPizzaDocument({
      name: 'create pizza',
      description: 'create description',
      imgSrc: 'create img',
      toppingIds: [mockTopping.id],
    });

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: createPizza }));
    });

    test('should call helper find once', async () => {
      await pizzaProvider.createPizza({
        name: createPizza.name,
        description: createPizza.description,
        imgSrc: createPizza.imgSrc,
        toppingIds: [mockTopping.id],
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(stubToppingProvider.validateToppings).toHaveBeenCalledTimes(1);
=======
  //Test Pizza Creation
  describe('createPizza', (): void => {
    const validPizza = createMockPizzaDocument({
      name: 'test pizza',
      description: 'description 1',
      ImgSrc: 'img 1',
      toppingIds: [],
    }); //INPUT TOPPINGIDS

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.createPizza({
        name: validPizza.name,
        description: validPizza.description,
        ImgSrc: validPizza.ImgSrc,
        toppingIds: validPizza.toppingIds.map((topping) => topping.toString()),
      }); //WHERE TO ALTER TYPE FOR THIS

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
>>>>>>> provider finished and half of resolver
    });

    test('should return a pizza when passed valid input', async () => {
      const result = await pizzaProvider.createPizza({
<<<<<<< HEAD
        name: createPizza.name,
        description: createPizza.description,
        imgSrc: createPizza.imgSrc,
        toppingIds: [mockTopping.id],
      });

      expect(result).toEqual(toPizzaObject(createPizza));
    });
  });

  //Test Delete Pizza
=======
        name: validPizza.name,
        description: validPizza.description,
        ImgSrc: validPizza.ImgSrc,
        toppingIds: validPizza.toppingIds.map((topping) => topping.toString()), //WHERE TO ALTER TYPE FOR THIS
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });

  //Test Pizza Deletion
>>>>>>> provider finished and half of resolver
  describe('delete Pizza', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: mockPizzaDocument }));
    });

    test('should call findOneAndDelete once', async () => {
<<<<<<< HEAD
      await pizzaProvider.deletePizza(mockPizzaDocument.id);
=======
      await pizzaProvider.deletePizza(mockPizza.id);
>>>>>>> provider finished and half of resolver

      expect(stubPizzaCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if findOneAndDelete return null for value', async () => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));

<<<<<<< HEAD
      await expect(pizzaProvider.deletePizza(mockPizzaDocument.id)).rejects.toThrow(
        new Error('Could not delete pizza')
      );
    });

    test('should return an id', async () => {
      const result = await pizzaProvider.deletePizza(mockPizzaDocument.id);

      expect(result).toEqual(mockPizzaDocument.id);
    });
  });

  //Test Update Pizza
  describe('updatePizza', (): void => {
    const updatedPizza = createMockPizzaDocument({
      name: 'updated pizza',
      description: 'updated description',
      imgSrc: 'updated img',
      toppingIds: [mockTopping.id],
    });

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: updatedPizza }));
=======
      await expect(pizzaProvider.deletePizza(mockPizza.id)).rejects.toThrow(new Error('Could not delete pizza'));
    });

    test('should return an id', async () => {
      const result = await pizzaProvider.deletePizza(mockPizza.id);

      expect(result).toEqual(mockPizza.id);
    });
  });

  //Test Pizza Update
  describe('updatePizza', (): void => {
    const validPizza = createMockPizzaDocument({
      name: 'test pizza',
      description: 'description 1',
      ImgSrc: 'img 1',
      toppingIds: [],
    }); //INPUT TOPPINGIDS

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
>>>>>>> provider finished and half of resolver
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.updatePizza({
<<<<<<< HEAD
        id: updatedPizza.id,
        name: updatedPizza.name,
        description: updatedPizza.description,
        imgSrc: updatedPizza.imgSrc,
        toppingIds: updatedPizza.toppingIds,
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(stubToppingProvider.validateToppings).toHaveBeenCalledTimes(1);
=======
        id: validPizza.id,
        name: validPizza.name,
        description: validPizza.description,
        ImgSrc: validPizza.ImgSrc,
        toppingIds: validPizza.toppingIds.map((topping) => topping.toString()), //WHERE TO ALTER TYPE FOR THIS
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
>>>>>>> provider finished and half of resolver
    });

    test('should return a pizza', async () => {
      const result = await pizzaProvider.updatePizza({
<<<<<<< HEAD
        id: updatedPizza.id,
        name: updatedPizza.name,
        description: updatedPizza.description,
        imgSrc: updatedPizza.imgSrc,
        toppingIds: updatedPizza.toppingIds,
      });

      expect(result).toEqual(toPizzaObject(updatedPizza));
=======
        id: validPizza.id,
        name: validPizza.name,
        description: validPizza.description,
        ImgSrc: validPizza.ImgSrc,
        toppingIds: validPizza.toppingIds.map((topping) => topping.toString()), //WHERE TO ALTER TYPE FOR THIS
      });

      expect(result).toEqual(toPizzaObject(validPizza));
>>>>>>> provider finished and half of resolver
    });
  });
});
