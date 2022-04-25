import { ObjectId } from 'mongodb';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  imgSrc: string;
  toppings: string[];
  priceCents: number;
}

export interface CreatePizzaInput {
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: ObjectId[];
}

export interface UpdatePizzaInput {
  id: ObjectId;
  name?: string | null;
  description?: string | null;
  imgSrc?: string | null;
  toppingIds?: ObjectId[] | null;
}
