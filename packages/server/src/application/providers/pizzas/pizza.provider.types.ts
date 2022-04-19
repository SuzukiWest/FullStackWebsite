export interface _Pizza {
  id: string;
  name: string;
  description: string;
  ImgSrc: string;
  toppings: string[];
  priceCents: number;
}

export type Pizza = Omit<_Pizza, 'toppings' | 'priceCents'> & { toppingIds: string[] };
