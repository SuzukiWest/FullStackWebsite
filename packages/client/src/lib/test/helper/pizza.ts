import { ObjectId } from 'bson';

import { Pizza } from '../../../types/schema';

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza & { __typename: string } => ({
  __typename: 'Pizza',
  id: new ObjectId().toHexString(),
  name: 'test pizza name',
  description: 'test pizza description',
  priceCents: 0,
  toppings: [],
  imgSrc: 'test pizza image',
  ...data,
});
