import { CreatePizzaInput, DeletePizzaInput, UpdatePizzaInput } from '../schema/types/schema';
import { pizzaProvider } from '../providers';
import { Root } from '../schema/types/types';
import { PizzaInp } from '../../../src/entities/pizza';
import { GetPizzasResponse, QueryInput } from '../providers/pizzas/pizza.provider.types';

const pizzaResolver = {
  Query: {
    pizzas: async (_: Root, args: { input: QueryInput }): Promise<GetPizzasResponse> => {
      return pizzaProvider.getPizzas(args.input);
    },
  },

  Mutation: {
    createPizza: async (_: Root, args: { input: CreatePizzaInput }): Promise<PizzaInp> => {
      return pizzaProvider.createPizza(args.input);
    },
    deletePizza: async (_: Root, args: { input: DeletePizzaInput }): Promise<string> => {
      return pizzaProvider.deletePizza(args.input.id);
    },
    updatePizza: async (_: Root, args: { input: UpdatePizzaInput }): Promise<PizzaInp> => {
      return pizzaProvider.updatePizza(args.input);
    },
  },
};

export { pizzaResolver };
