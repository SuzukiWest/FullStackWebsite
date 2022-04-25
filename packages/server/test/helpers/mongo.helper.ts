const mockToArray =
  (resultArray: any[]): any =>
  (): any =>
    ({ toArray: (): any => resultArray } as any);

const mockSortToArray =
  (resultArray: any[]): any =>
  (): any =>
    ({ sort: () => ({ toArray: (): any => resultArray }) } as any);

//Mock filter for .find
//const mockFilter = (resultArray: any[]) : any[] => resultArray;//(resultArray.filter(ele => ele._id in ids));
const mockFilterToppingIds = (resultArray: any[], ids: any[]): any =>
  resultArray.filter((ele) => ids.includes(ele._id));

export { mockToArray, mockSortToArray, mockFilterToppingIds };
