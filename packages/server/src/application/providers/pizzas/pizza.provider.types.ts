import { ObjectId } from 'mongodb';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  ImgSrc: string;
  toppingIds: [ObjectId];
}
