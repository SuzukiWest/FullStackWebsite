import { Collection, ObjectId } from 'mongodb';

import { reveal, stub } from 'jest-auto-stub';
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { mockSortToArray, mockFilterToppingIds } from '../helpers/mongo.helper';
import { createMockToppingDocument } from '../helpers/topping.helper';
import { ToppingDocument, toToppingObject } from '../../src/entities/topping';

const stubToppingCollection = stub<Collection<ToppingDocument>>();
const toppingProvider = new ToppingProvider(stubToppingCollection);

beforeEach(jest.clearAllMocks);

describe('toppingProvider', (): void => {
  const mockToppingDocument = createMockToppingDocument();
  const mockTopping = toToppingObject(mockToppingDocument);
  const mockToppingDoc2 = createMockToppingDocument({ name: 'topping2', priceCents: 9000 });
  const mockTopping2 = toToppingObject(mockToppingDoc2);
  const mockToppingDoc3 = createMockToppingDocument({ name: 'topping3', priceCents: 9000 });
  const mockTopping3 = toToppingObject(mockToppingDoc3);
  const mockToppings = [mockTopping, mockTopping2, mockTopping3];

  describe('Gets', (): void => {
    describe('getToppings', (): void => {
      beforeEach(() => {
        reveal(stubToppingCollection).find.mockImplementation(
          mockSortToArray([mockToppingDocument, mockToppingDoc2, mockToppingDoc3])
        );
      });
      test('should call find once', async () => {
        await toppingProvider.getToppings();

        expect(stubToppingCollection.find).toHaveBeenCalledTimes(1);
      });

      test('should get all toppings', async () => {
        const result = await toppingProvider.getToppings();

        expect(result).toEqual(mockToppings);
      });
    });

    describe('getToppingsByIds', (): void => {
      beforeEach(() => {
        reveal(stubToppingCollection).find.mockImplementation(
          mockSortToArray(
            mockFilterToppingIds([mockToppingDocument, mockToppingDoc2, mockToppingDoc3], [mockToppingDoc2._id])
          )
        );
        //reveal(stubToppingCollection).find({_id: {$in: mockToppingDoc2._id}});
      });
      test('should call functions once', async () => {
        await toppingProvider.getToppingsByIds([mockToppingDoc2._id]);

        expect(stubToppingCollection.find).toHaveBeenCalledTimes(1);
      });
      test('should get topping of provided Id', async () => {
        const result = await toppingProvider.getToppingsByIds([mockToppingDoc2._id]);
        console.log(result);
        expect(result).toEqual([mockTopping2]);
      });
    });

    describe('getPriceCents', (): void => {
      beforeEach(() => {
        reveal(stubToppingCollection).find.mockImplementation(
          mockSortToArray([mockToppingDocument, mockToppingDoc2, mockToppingDoc3])
        );
      });
      test('should get price of single topping', async () => {
        const result = await toppingProvider.getPriceCents([mockTopping]);

        expect(result).toEqual(mockTopping.priceCents);
      });
      test('should get price of multiple provided toppings', async () => {
        const result = await toppingProvider.getPriceCents([mockTopping, mockTopping2]);

        expect(result).toEqual(mockTopping.priceCents + mockTopping2.priceCents);
      });
    });

    describe('validateToppings', (): void => {
      beforeEach(() => {
        reveal(stubToppingCollection).find.mockImplementation(
          mockSortToArray(
            mockFilterToppingIds([mockToppingDocument, mockToppingDoc2, mockToppingDoc3], [mockToppingDoc2._id])
          )
        );
      });
      test('call getToppingsByIds once', async () => {
        await toppingProvider.validateToppings([mockToppingDoc2._id]);

        expect(toppingProvider.getToppingsByIds).toBeCalledTimes(1);
      });
      test('should throw Error if empty list input', async () => {
        const result = await toppingProvider.validateToppings([]);

        expect(result).toThrow(Error);
      });
      test('should throw Error if toppingIds invalid', async () => {
        const result = await toppingProvider.validateToppings([new ObjectId()]);

        expect(result).toThrow();
      });
    });
  });

  describe('createTopping', (): void => {
    const validTopping = createMockToppingDocument({ name: 'test topping', priceCents: 12345 });

    beforeEach(() => {
      reveal(stubToppingCollection).findOneAndUpdate.mockImplementation(() => ({ value: validTopping }));
    });
    test('should call findOneAndUpdate once', async () => {
      await toppingProvider.createTopping({ name: validTopping.name, priceCents: validTopping.priceCents });

      expect(stubToppingCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a topping when passed valid input', async () => {
      const result = await toppingProvider.createTopping({
        name: validTopping.name,
        priceCents: validTopping.priceCents,
      });

      expect(result).toEqual(toToppingObject(validTopping));
    });
  });
  describe('deleteTopping', (): void => {
    beforeEach(() => {
      reveal(stubToppingCollection).findOneAndDelete.mockImplementation(() => ({ value: mockToppingDocument }));
    });
    test('should call findOneAndDelete once', async () => {
      await toppingProvider.deleteTopping(mockTopping.id);

      expect(stubToppingCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if findOneAndDelete returns null for value', async () => {
      reveal(stubToppingCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));

      await expect(toppingProvider.deleteTopping(mockTopping.id)).rejects.toThrow(
        new Error('Could not delete the topping')
      );
    });

    test('should return an id', async () => {
      const result = await toppingProvider.deleteTopping(mockTopping.id);

      expect(result).toEqual(mockTopping.id);
    });
  });
  describe('updateTopping', (): void => {
    const validTopping = createMockToppingDocument({ name: 'test topping', priceCents: 12345 });

    beforeEach(() => {
      reveal(stubToppingCollection).findOneAndUpdate.mockImplementation(() => ({ value: validTopping }));
    });

    test('should call findOneAndUpdate once', async () => {
      await toppingProvider.updateTopping({
        id: validTopping.id,
        name: validTopping.name,
        priceCents: validTopping.priceCents,
      });

      expect(stubToppingCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a topping', async () => {
      const result = await toppingProvider.updateTopping({
        id: validTopping.id,
        name: validTopping.name,
        priceCents: validTopping.priceCents,
      });

      expect(result).toEqual(toToppingObject(validTopping));
    });
  });
});
