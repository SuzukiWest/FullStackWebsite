import { Document } from 'mongodb';
import { Pizza } from '../application/providers/pizzas/pizza.provider.types';

export type PizzaInp = Omit<Pizza, 'toppings' | 'priceCents'> & { toppingIds: string[] };
interface PizzaDocument extends Document, Omit<PizzaInp, 'id'> {}

const toPizzaObject = (pizza: PizzaDocument): PizzaInp => {
  return {
    id: pizza._id.toHexString(),
    name: pizza.name,
    description: pizza.description,
<<<<<<< HEAD
    imgSrc: pizza.imgSrc,
=======
    ImgSrc: pizza.imgSrc,
>>>>>>> more update-pizza tweaks
    toppingIds: pizza.toppingIds,
  };
};

export { PizzaDocument, toPizzaObject };
