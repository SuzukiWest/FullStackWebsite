export interface _Pizza {
  id: string;
  name: string;
  description: string;
  ImgSrc: string;
  toppings: string[];
}

export type Pizza = Omit<_Pizza, 'toppings'> & { toppingIds: string[] };
