import { Topping } from './schema';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  ImgSrc: string;
<<<<<<< HEAD
  toppings: Topping[];
=======
  toppings: [Topping];
>>>>>>> alter toppings!]!
}
