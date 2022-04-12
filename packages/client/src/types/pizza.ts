import { Topping } from './schema';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  ImgSrc: string;
  toppings: Topping[];
}
