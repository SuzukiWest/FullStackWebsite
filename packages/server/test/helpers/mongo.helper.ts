const mockToArray =
  (resultArray: any[]): any =>
  (): any =>
    ({ toArray: (): any => resultArray } as any);

const mockSortToArray =
  (resultArray: any[]): any =>
  (): any =>
    ({ sort: () => ({ toArray: (): any => resultArray }) } as any);

//Mock filter for .find({_id:{$in:toppingIds}})
//Replacement for mongo DB filter
const mockFilterToppingIds = (resultArray: any[], ids: any[]): any =>
  resultArray.filter((ele) => ids.includes(ele._id));

export { mockToArray, mockSortToArray, mockFilterToppingIds };
