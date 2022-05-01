import { Root } from '../schema/types/types';

//Topping imports
import { CreateToppingInput, DeleteToppingInput, Topping, UpdateToppingInput } from '../schema/types/schema';
import { toppingProvider } from '../providers';

const toppingResolver = {
  Query: {
    toppings: async (): Promise<Topping[]> => {
      return toppingProvider.getToppings();
    },
  },

  Pizza: {
    toppings: async (pizza: { toppingIds: string[] }): Promise<Topping[]> => {
      return toppingProvider.getToppingsByIds(pizza.toppingIds);
    },
    //Or could I access the pizza.toppings here rather than having to retrieve toppings by ids again
    priceCents: async (pizza: { toppingIds: string[] }): Promise<number> => {
      return toppingProvider.getPriceCents(pizza.toppingIds);
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
