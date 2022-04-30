import { Topping } from './schema';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  imgSrc: string;
  toppings: Topping[];
  priceCents: number;
}
