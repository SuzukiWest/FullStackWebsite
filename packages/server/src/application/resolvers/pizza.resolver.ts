import { Pizza } from '../providers/pizzas/pizza.provider.types';
import { pizzaProvider } from '../providers';

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<Pizza[]> => {
      return pizzaProvider.getPizzas();
    },
  },
};

export { pizzaResolver };
