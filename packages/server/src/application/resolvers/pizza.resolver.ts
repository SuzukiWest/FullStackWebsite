import { CreatePizzaInput, DeletePizzaInput } from '../schema/types/schema';
import { Pizza, UpdatePizzaInput } from '../providers/pizzas/pizza.provider.types';
import { pizzaProvider } from '../providers';
import { Root } from '../schema/types/types';

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<Pizza[]> => {
      return pizzaProvider.getPizzas();
    },
  },

  Mutation: {
    createPizza: async (_: Root, args: { input: CreatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.createPizza(args.input);
    },
    deletePizza: async (_: Root, args: { input: DeletePizzaInput }): Promise<string> => {
      return pizzaProvider.deletePizza(args.input.id);
    },
    updatePizza: async (_: Root, args: { input: UpdatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.updatePizza(args.input);
    },
  },
};

export { pizzaResolver };
