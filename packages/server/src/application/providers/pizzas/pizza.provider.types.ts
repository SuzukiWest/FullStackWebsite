import { ObjectId } from 'mongodb';

export interface _Pizza {
  id: string;
  name: string;
  description: string;
  ImgSrc: string;
  toppings: string[];
  priceCents: number;
}

export interface CreatePizzaInput {
  name: string;
  description: string;
  ImgSrc: string;
  toppingIds: string[];
}

export interface UpdatePizzaInput {
  id: string;
  name?: string;
  description?: string;
  ImgSrc?: string;
  toppingIds?: string[];
}

export type Pizza = Omit<_Pizza, 'toppings' | 'priceCents'> & { toppingIds: ObjectId[] };
