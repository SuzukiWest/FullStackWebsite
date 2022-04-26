export const mockdisplayPizzas = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return { displayPizzas: mockdisplayPizzas };
});

export default mock;
