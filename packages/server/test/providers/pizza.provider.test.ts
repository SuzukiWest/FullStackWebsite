import { Collection } from 'mongodb';

import { reveal, stub } from 'jest-auto-stub';
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { mockSortToArray } from '../helpers/mongo.helper';
import { createMockPizzaDocument } from '../helpers/pizza.helper';
import { PizzaDocument, toPizzaObject } from '../../src/entities/pizza';
import { PizzaProvider } from '../../src/application/providers/pizzas/pizza.provider';
import { ToppingDocument } from '../../src/entities/topping';
import { createMockTopping } from '../helpers/topping.helper';

const stubPizzaCollection = stub<Collection<PizzaDocument>>();
const stubToppingProvider = stub<ToppingProvider>();

const pizzaProvider = new PizzaProvider(stubPizzaCollection, stubToppingProvider);

beforeEach(jest.clearAllMocks);

//Test Pizzas Query
describe('pizzaProvider', (): void => {
  const mockPizzaDocument = createMockPizzaDocument();
  const mockPizza = toPizzaObject(mockPizzaDocument);

  describe('getPizzas', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).find.mockImplementation(mockSortToArray([mockPizzaDocument]));
    });

    test('should call find once', async () => {
      await pizzaProvider.getPizzas();

      expect(stubPizzaCollection.find).toHaveBeenCalledTimes(1);
    });

    test('should get all toppings', async () => {
      const result = await pizzaProvider.getPizzas();

      expect(result).toEqual([mockPizza]);
    });
  });

  //Test Pizza Creation
  describe('createPizza', (): void => {
    const validPizza = createMockPizzaDocument({
      name: 'test pizza',
      description: 'description 1',
      imgSrc: 'img 1',
      toppingIds: [],
    }); //INPUT TOPPINGIDS

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.createPizza({
        name: validPizza.name,
        description: validPizza.description,
        imgSrc: validPizza.imgSrc,
        toppingIds: validPizza.toppingIds,
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a pizza when passed valid input', async () => {
      const result = await pizzaProvider.createPizza({
        name: validPizza.name,
        description: validPizza.description,
        imgSrc: validPizza.imgSrc,
        toppingIds: validPizza.toppingIds,
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });

  //Test Pizza Deletion
  describe('delete Pizza', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: mockPizzaDocument }));
    });

    test('should call findOneAndDelete once', async () => {
      await pizzaProvider.deletePizza(mockPizza.id);

      expect(stubPizzaCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if findOneAndDelete return null for value', async () => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));

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
      imgSrc: 'img 1',
      toppingIds: [],
    }); //INPUT TOPPINGIDS

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: validPizza.name,
        description: validPizza.description,
        imgSrc: validPizza.imgSrc,
        toppingIds: validPizza.toppingIds,
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a pizza', async () => {
      const result = await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: validPizza.name,
        description: validPizza.description,
        imgSrc: validPizza.imgSrc,
        toppingIds: validPizza.toppingIds,
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });
});
