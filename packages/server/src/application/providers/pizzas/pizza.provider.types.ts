import { PizzaInp } from 'src/entities/pizza';

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
  id: string;
  name?: string | null;
  description?: string | null;
  imgSrc?: string | null;
  toppingIds?: string[] | null;
}

export interface GetPizzasResponse {
  hasNextPage: boolean;
  cursorPosition: string;
  totalCount: number;
  results: PizzaInp[];
}

export interface QueryInput {
  limit: number | null;
}
