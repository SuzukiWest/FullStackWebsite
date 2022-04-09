import { Topping } from 'src/application/schema/types/schema';

interface _Pizza {
  id: string;
  name: string;
  description: string;
  ImgSrc: string;
  toppings: Topping[];
}

export type Pizza = Omit<_Pizza, 'toppings'> & { toppingIds: string[] };
