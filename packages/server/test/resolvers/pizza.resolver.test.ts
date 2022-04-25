import { gql } from 'apollo-server-core';
import { toppingResolver } from '../../src/application/resolvers/topping.resolver';
import { typeDefs } from '../../src/application/schema';
import {
  MutationCreatePizzaArgs,
  MutationDeletePizzaArgs,
  MutationUpdatePizzaArgs,
} from '../../src/application/schema/types/schema';
import { TestClient } from '../helpers/client.helper';
import { createMockPizza, createMockPizzaInp, createMockTopping } from '../helpers/pizza.helper';
import { pizzaResolver } from '../../src/application/resolvers/pizza.resolver';
import { toppingProvider, pizzaProvider } from '../../src/application/providers';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockTopping = createMockTopping();
const mockPizzaInp = createMockPizzaInp({ toppingIds: [mockTopping.id] });
const mockPizza = createMockPizza({
  ...mockPizzaInp,
  toppings: [mockTopping],
  priceCents: mockTopping.priceCents,
});

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
        query getPizzas {
          pizzas {
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

      describe('should get all pizzas', () => {
        test('should getPizzas', async () => {
          const pizzas = jest.spyOn(pizzaProvider, 'getPizzas').mockResolvedValue([mockPizzaInp]);
          expect(pizzas).toBeTruthy();
          const toppings = jest.spyOn(toppingProvider, 'getToppingsByIds').mockResolvedValue(mockPizza.toppings);
          expect(toppings).toBeTruthy();
          const price = jest.spyOn(toppingProvider, 'getPriceCents').mockResolvedValue(mockPizza.priceCents);
          expect(price).toBeTruthy();

          //resolvers run here
          const result = await client.query({ query });

          expect(result.data).toEqual({
            pizzas: [
              {
                __typename: 'Pizza',
                id: mockPizza.id,
                name: mockPizza.name,
                description: mockPizza.description,
                imgSrc: mockPizza.imgSrc,
                toppings: mockPizza.toppings,
                priceCents: mockPizza.priceCents,
              },
            ],
          });

          expect(pizzaProvider.getPizzas).toHaveBeenCalledTimes(1);
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
      });

      test('should call create pizza when passed valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: createdPizzaInp.name,
            description: createdPizzaInp.description,
            imgSrc: createdPizzaInp.imgSrc,
            toppingIds: createdPizzaInp.toppingIds,
          },
        };

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
