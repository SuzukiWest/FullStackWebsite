import { ObjectId } from 'mongodb';

export interface Pizza {
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
  toppingIds: ObjectId[];
}

export interface UpdatePizzaInput {
  id: ObjectId;
  name?: string | null;
  description?: string | null;
  ImgSrc?: string | null;
  toppingIds?: ObjectId[] | null;
}
