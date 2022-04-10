import { CreateToppingInput, DeleteToppingInput, Topping, UpdateToppingInput } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { toppingProvider } from '../providers';
import { ObjectId } from 'mongodb';

const toppingResolver = {
  Query: {
    toppings: async (): Promise<Topping[]> => {
      const toppings = await toppingProvider.getToppings();
      return toppings;
    },
  },

  Pizza: {
    toppings: async (pizza: { toppingIds: ObjectId[] }): Promise<Topping[]> => {
      return await toppingProvider.getToppingsByIds(pizza.toppingIds);
    },
    priceCents: async (pizza: { toppingIds: ObjectId[] }): Promise<number> => {
      const toppings = await toppingProvider.getToppingsByIds(pizza.toppingIds);
      const priceCents = await toppingProvider.getPriceCents(toppings);
      return priceCents;
    },
  },

  Mutation: {
    createTopping: async (_: Root, args: { input: CreateToppingInput }): Promise<Topping> => {
      return toppingProvider.createTopping(args.input);
    },

    deleteTopping: async (_: Root, args: { input: DeleteToppingInput }): Promise<string> => {
      return toppingProvider.deleteTopping(args.input.id);
    },

    updateTopping: async (_: Root, args: { input: UpdateToppingInput }): Promise<Topping> => {
      return toppingProvider.updateTopping(args.input);
    },
  },
};

export { toppingResolver };
