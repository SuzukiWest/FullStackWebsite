import { ObjectId } from 'bson';

import { Pizza } from '../../../types/schema';
import { Topping } from '../../../types/schema';

export const createTestTopping = (data: Partial<Topping> = {}): Topping & { __typename: string } => ({
  __typename: 'Topping',
  id: new ObjectId().toHexString(),
  name: 'test topping',
  priceCents: 350,
  ...data,
});

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza & { __typename: string } => ({
  __typename: 'Pizza',
  id: new ObjectId().toHexString(),
  name: 'test pizza name',
  description: 'test pizza description',
  imgSrc: 'test pizza image',
  priceCents: 0,
  toppings: [],
  ...data,
});
