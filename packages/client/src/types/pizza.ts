import { ObjectId } from 'mongodb';
import { Topping } from './schema';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  ImgSrc: string;
  toppingIds: [ObjectId];
  toppings: [Topping];
}
