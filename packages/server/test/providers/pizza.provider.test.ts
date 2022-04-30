//Helper mock functions
import { createMockPizzaDocument, createMockTopping, mockCursorResult } from '../helpers/pizza.helper';
import { reveal, stub } from 'jest-auto-stub';

//Provider/Type imports
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { PizzaDocument, toPizzaObject } from '../../src/entities/pizza';
import { PizzaProvider } from '../../src/application/providers/pizzas/pizza.provider';
import { Collection } from 'mongodb';
import { CursorProvider } from '../../src/application/providers/cursor/cursor.provider';

const stubPizzaCollection = stub<Collection<PizzaDocument>>();
const stubToppingProvider = stub<ToppingProvider>();
const stubCursorProvider = stub<CursorProvider>();

const pizzaProvider = new PizzaProvider(stubPizzaCollection, stubToppingProvider, stubCursorProvider);

beforeEach(jest.clearAllMocks);

//Test Pizza Provider
describe('pizzaProvider', (): void => {
  //Build test data
  const mockTopping = createMockTopping();
  const mockPizzaDocument = createMockPizzaDocument({ toppingIds: [mockTopping.id] });
  const mockPizza = toPizzaObject(mockPizzaDocument);

  const mockPizzaDocument2 = createMockPizzaDocument({ name: 'pizza2', toppingIds: [mockTopping.id] });
  const mockPizza2 = toPizzaObject(mockPizzaDocument);
  const mockCursorRet = mockCursorResult({
    hasNextPage: true,
    cursorPosition: mockPizza.id,
    totalCount: 1,
    results: [mockPizza],
  });

  //Test Pizzas Query
  describe('getPizzas', (): void => {
    describe('getPizzas with null cursor', (): void => {
      const mockCursor = 1;
      beforeEach(() => {
        reveal(stubCursorProvider).getCursorResult.mockResolvedValue(mockCursorRet);
      });
      test('should call getPizzas', async () => {
        await pizzaProvider.getPizzas(mockCursor);

        expect(stubCursorProvider.getCursorResult).toHaveBeenCalledTimes(1);
      });
      test('should get a pizza', async () => {
        const result = await pizzaProvider.getPizzas(mockCursor);
        expect(result).toEqual(mockCursorRet);
      });
    });
  });
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
    });

    test('should return a pizza when passed valid input', async () => {
      const result = await pizzaProvider.createPizza({
        name: createPizza.name,
        description: createPizza.description,
        imgSrc: createPizza.imgSrc,
        toppingIds: [mockTopping.id],
      });

      expect(result).toEqual(toPizzaObject(createPizza));
    });
  });

  //Test Delete Pizza
  describe('delete Pizza', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: mockPizzaDocument }));
    });

    test('should call findOneAndDelete once', async () => {
      await pizzaProvider.deletePizza(mockPizzaDocument.id);

      expect(stubPizzaCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if findOneAndDelete return null for value', async () => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));

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
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.updatePizza({
        id: updatedPizza.id,
        name: updatedPizza.name,
        description: updatedPizza.description,
        imgSrc: updatedPizza.imgSrc,
        toppingIds: updatedPizza.toppingIds,
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(stubToppingProvider.validateToppings).toHaveBeenCalledTimes(1);
    });

    test('should return a pizza', async () => {
      const result = await pizzaProvider.updatePizza({
        id: updatedPizza.id,
        name: updatedPizza.name,
        description: updatedPizza.description,
        imgSrc: updatedPizza.imgSrc,
        toppingIds: updatedPizza.toppingIds,
      });

      expect(result).toEqual(toPizzaObject(updatedPizza));
    });
  });
});
