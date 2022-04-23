import { gql } from 'apollo-server-core';
import { toppingResolver } from '../../src/application/resolvers/topping.resolver';
import { typeDefs } from '../../src/application/schema';
import {
  MutationCreatePizzaArgs,
  MutationDeletePizzaArgs,
  MutationUpdatePizzaArgs,
} from '../../src/application/schema/types/schema';
import { PizzaDocument, toPizzaObject } from '../../src/entities/pizza';
import { TestClient } from '../helpers/client.helper';
import { createMockPizza, createMockPizzaDocument, createMockPizzaInp } from '../helpers/pizza.helper';
import { pizzaResolver } from '../../src/application/resolvers/pizza.resolver';
import { createMockTopping } from '../helpers/topping.helper';
import { ObjectId } from 'bson';

import mocked from 'ts-jest';

//import { mockdisplayPizzas } from './pizza';

import { stub } from 'jest-auto-stub';
import { Collection } from 'mongodb';
import { PizzaProvider } from '../../src/application/providers/pizzas/pizza.provider';
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { toppingProvider } from '../../src/application/providers';
let client: TestClient;

const stubPizzaCollection = stub<Collection<PizzaDocument>>();
const stubToppingProvider = stub<ToppingProvider>();

const pizzaProvider = new PizzaProvider(stubPizzaCollection, stubToppingProvider);

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

/*
jest.mock('../../src/application/providers/pizzas/pizza.provider', () => ({
  // Works and lets you check for constructor calls:
  return jest.fn().mockImplementation(() => {
    return {displayPizzas: () => {}};
  }))
}));

const displayPizzas = jest.fn();
jest.mock('../../src/application/providers/pizzas/pizza.provider', () => {
  return jest.fn().mockImplementation(() => {
    return {displayPizzas: mockdisplayPizzas};
  });
});
*/
const mockPizzaInp = createMockPizzaInp();
const mockTopping = createMockTopping();
const mockPizza = createMockPizza();

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, [pizzaResolver, toppingResolver]);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
  //SoundPlayer.mockClear();
  //mockdisplayPizzas.mockClear();
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
          const toppings = jest.spyOn(pizzaProvider, 'getPizzaToppings').mockResolvedValue(mockPizza.toppings);
          const price = jest.spyOn(pizzaProvider, 'getPizzaPrice').mockResolvedValue(mockPizza.priceCents);

          //resolvers run here
          const result = await client.query({ query });
          console.log(result.data);
          console.log(mockPizza);

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
        });
      });
    });
  });
  /*
  //Test Resolver Mutations
  describe('Mutation', () => {
    describe('createPizza', () => {
      const mutation = gql`
        mutation ($input: CreatePizzaInput!) {
          createPizza(input: $input) {
            name
            description
            imgSrc
            toppingIds
          }
        }
      `;

      const validPizza = createMockPizza({
        name: 'test pizza',
        description: 'description 1',
        imgSrc: 'img 1',
        toppings: [],
        priceCents: 250,
      }); //INPUT TOPPING OBJECTS

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'createPizza').mockResolvedValue(validPizza); //COMPARE PIZZA VS _PIZZA AND WHERE TO USE EACH
      });

      test('should call create pizza when passed valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppings.map((topping) => topping.id),
          },
        };

        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          createPizza: {
            __typename: 'Pizza',
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppings.map((topping) => topping.id),
          },
        });
      });
    });

    describe('deletePizza', () => {
      const mutation = gql`
        mutation ($input: DeletePizzaInput!) {
          deletePizza(input: $input)
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
            toppings
            priceCents
          }
        }
      `;
      const updatedPizza = createMockPizza({
        name: 'test pizza',
        description: 'description 1',
        imgSrc: 'img 1',
        toppings: [],
        priceCents: 250,
      });

      const variables: MutationUpdatePizzaArgs = { input: { id: mockPizza.id, name: updatedPizza.name } };
    });
  });
  */
});
