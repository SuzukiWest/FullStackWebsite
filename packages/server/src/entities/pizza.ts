import { Document, ObjectId } from 'mongodb';
import { Pizza } from '../application/providers/pizzas/pizza.provider.types';

type PizzaInp = Omit<Pizza, 'toppings' | 'priceCents'> & { toppingIds: ObjectId[] };
interface PizzaDocument extends Document, Omit<PizzaInp, 'id'> {}

const toPizzaObject = (pizza: PizzaDocument): PizzaInp => {
  return {
    id: pizza._id.toHexString(),
    name: pizza.name,
    description: pizza.description,
    imgSrc: pizza.imgSrc,
    toppingIds: pizza.toppingIds,
  };
};

export { PizzaDocument, toPizzaObject, PizzaInp };
