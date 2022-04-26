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
  toppingIds: string[];
}

export interface UpdatePizzaInput {
  id: ObjectId;
  name?: string;
  description?: string;
  imgSrc?: string;
  toppingIds?: string[];
}
