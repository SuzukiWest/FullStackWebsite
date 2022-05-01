import { gql } from 'apollo-server-core';
import { toppingResolver } from '../../src/application/resolvers/topping.resolver';
import { typeDefs } from '../../src/application/schema';
import {
  MutationCreatePizzaArgs,
  MutationDeletePizzaArgs,
  MutationUpdatePizzaArgs,
  QueryPizzasArgs,
} from '../../src/application/schema/types/schema';
import { TestClient } from '../helpers/client.helper';
import {
  createMockPizza,
  createMockPizzaInp,
  createMockTopping,
  createPizzaPage,
  mockCursorResult,
} from '../helpers/pizza.helper';
import { pizzaResolver } from '../../src/application/resolvers/pizza.resolver';
import { toppingProvider, pizzaProvider, cursorProvider } from '../../src/application/providers';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockTopping = createMockTopping();
const mockPizzaInp = createMockPizzaInp({ toppingIds: [mockTopping.id] });
const mockPizza = createMockPizza({
  id: mockPizzaInp.id,
  toppings: [mockTopping],
  priceCents: mockTopping.priceCents,
});
const mockCursorRes = mockCursorResult({
  hasNextPage: true,
  cursorPosition: mockPizza.id,
  totalCount: 1,
  results: [mockPizzaInp],
});
const mockPizzaPage = createPizzaPage({
  hasNextPage: true,
  cursorPosition: mockPizza.id,
  totalCount: 1,
  results: [mockPizza],
});
const emptyIndex = '000000000000000000000000';

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, [pizzaResolver, toppingResolver]);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

describe('pizzaResolver', (): void => {
  describe('Query', () => {
    describe('pizzas', () => {
      const query = gql`
        query ($input: QueryInput!) {
          pizzas(input: $input) {
            totalCount
            hasNextPage
            cursorPosition
            results {
              id
              name
              description
              imgSrc
              priceCents
              toppings {
                id
                name
                priceCents
              }
            }
          }
        }
      `;

      describe('should get a pizza', () => {
        beforeEach(async (): Promise<void> => {});

        const variables: QueryPizzasArgs = {
          input: { limit: 1 },
        };
        test('should getPizza', async () => {
          jest.spyOn(cursorProvider, 'getCursorResult').mockResolvedValue(mockCursorRes);

          jest.spyOn(toppingProvider, 'getToppingsByIds').mockResolvedValue(mockPizza.toppings);
          jest.spyOn(toppingProvider, 'getPriceCents').mockResolvedValue(mockPizza.priceCents);

          //resolvers run here
          const result = await client.query({ query, variables });

          expect(result.data).toEqual({
            pizzas: {
              __typename: 'GetPizzasResponse',
              totalCount: mockPizzaPage.totalCount,
              hasNextPage: mockPizzaPage.hasNextPage,
              cursorPosition: mockPizzaPage.cursorPosition,
              results: mockPizzaPage.results,
            },
          });
          expect(cursorProvider.getCursorResult).toHaveBeenCalledTimes(1);

          expect(toppingProvider.getToppingsByIds).toHaveBeenCalledTimes(1);
          expect(toppingProvider.getPriceCents).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  //Test Resolver Mutations
  describe('Mutation', () => {
    describe('createPizza', () => {
      const mutation = gql`
        mutation ($input: CreatePizzaInput!) {
          createPizza(input: $input) {
            name
            description
            imgSrc
            toppings {
              id
              name
              priceCents
            }
            priceCents
          }
        }
      `;
      const createdPizzaInp = createMockPizzaInp({
        name: 'created pizza',
        description: 'created description',
        imgSrc: 'created img',
        toppingIds: [mockTopping.id],
      });
      const createdPizza = createMockPizza({
        id: createdPizzaInp.id,
        name: createdPizzaInp.name,
        description: createdPizzaInp.description,
        imgSrc: createdPizzaInp.imgSrc,
        toppings: [mockTopping],
        priceCents: mockTopping.priceCents,
      });

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'createPizza').mockResolvedValue(createdPizzaInp);
        jest.spyOn(toppingProvider, 'getToppingsByIds').mockResolvedValue(createdPizza.toppings);
        jest.spyOn(toppingProvider, 'getPriceCents').mockResolvedValue(createdPizza.priceCents);
        jest.spyOn(toppingProvider, 'validateToppings');
      });

      const variables: MutationCreatePizzaArgs = {
        input: {
          name: createdPizzaInp.name,
          description: createdPizzaInp.description,
          imgSrc: createdPizzaInp.imgSrc,
          toppingIds: createdPizzaInp.toppingIds,
        },
      };
      test('should call create pizza when passed valid input', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          createPizza: {
            __typename: 'Pizza',
            name: createdPizza.name,
            description: createdPizza.description,
            imgSrc: createdPizza.imgSrc,
            toppings: createdPizza.toppings,
            priceCents: createdPizza.priceCents,
          },
        });
      });

      test('should call create pizza when passed valid input', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.createPizza).toHaveBeenCalledTimes(1);
        expect(toppingProvider.getToppingsByIds).toHaveBeenCalledTimes(1);
        expect(toppingProvider.getPriceCents).toHaveBeenCalledTimes(1);
        expect(pizzaProvider.createPizza).toHaveBeenCalledWith(variables.input);
      });
    });

    describe('deletePizza', () => {
      const mutation = gql`
        mutation ($input: DeletePizzaInput!) {
          deletePizza(input: $input) {
            id
          }
        }
      `;

      const variables: MutationDeletePizzaArgs = { input: { id: mockPizza.id } };

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'deletePizza').mockResolvedValue(mockPizza.id);
      });

      test('should call deletePizza using id', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.deletePizza).toHaveBeenCalledWith(variables.input.id);
      });

      test('should return deleted topping id', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          deletePizza: mockPizza.id,
        });
      });
      test('should return deleted topping id', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          deletePizza: mockPizza.id,
        });
      });

      describe('updatePizza', () => {
        const mutation = gql`
          mutation ($input: UpdatePizzaInput!) {
            updatePizza(input: $input) {
              id
              name
              description
              imgSrc
              toppings {
                id
                name
                priceCents
              }
              priceCents
            }
          }
        `;

        const mockTopping2 = createMockTopping({ name: 'topping2', priceCents: 5 });
        const updatedPizzaInp = createMockPizzaInp({
          name: 'updated pizza',
          description: 'updated description',
          imgSrc: 'updated Pizza',
          toppingIds: [mockTopping2.id],
        });
        const updatedPizza = createMockPizza({
          id: updatedPizzaInp.id,
          name: updatedPizzaInp.name,
          description: updatedPizzaInp.description,
          imgSrc: updatedPizzaInp.imgSrc,
          toppings: [mockTopping2],
          priceCents: mockTopping2.priceCents,
        });

        const variables: MutationUpdatePizzaArgs = {
          input: {
            id: mockPizza.id,
            name: updatedPizza.name,
            imgSrc: updatedPizza.imgSrc,
            description: updatedPizza.description,
            toppingIds: updatedPizzaInp.toppingIds,
          },
        };

        beforeEach(() => {
          jest.spyOn(pizzaProvider, 'updatePizza').mockResolvedValue(updatedPizzaInp);
          jest.spyOn(toppingProvider, 'getToppingsByIds').mockResolvedValue(updatedPizza.toppings);
          jest.spyOn(toppingProvider, 'getPriceCents').mockResolvedValue(updatedPizza.priceCents);
        });

        test('should call updatePizza', async () => {
          await client.mutate({ mutation, variables });

          expect(pizzaProvider.updatePizza).toHaveBeenCalledTimes(1);
          expect(toppingProvider.getToppingsByIds).toHaveBeenCalledTimes(1);
          expect(toppingProvider.getPriceCents).toHaveBeenCalledTimes(1);
          expect(pizzaProvider.updatePizza).toHaveBeenCalledWith(variables.input);
        });

        test('should return updated pizza', async () => {
          const result = await client.mutate({ mutation, variables });

          expect(result.data).toEqual({
            updatePizza: {
              ...updatedPizza,
            },
          });
        });
      });
    });
  });
});
