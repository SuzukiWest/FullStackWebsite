import { getDescription } from 'graphql';
import { pizzaProvider } from 'src/application/providers';
import { toppingResolver } from 'src/application/resolvers/topping.resolver';
import { typeDefs } from 'src/application/schema';
import {
  MutationCreatePizzaArgs,
  MutationDeletePizzaArgs,
  MutationUpdatePizzaArgs,
} from 'src/application/schema/types/schema';
import { TestClient } from 'test/helpers/client.helper';
import { createMockPizza } from 'test/helpers/pizza.helper';
import { pizzaResolver } from '../../src/application/resolvers/pizza.resolver';

let client: TestClient;

jest.mock('../../src/applications/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockPizza = createMockPizza();

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
            ImgSrc
            toppings {
              id
              name
              priceCents
            }
            priceCents
          }
        }
      `;

      test('should get all pizzas', async () => {
        jest.spyOn(pizzaProvider, 'getPizzas').mockResolvedValue([mockPizza]);

        const result = await client.query({ query });

        expect(result.data).toEqual({
          pizzas: [
            {
              __typename: 'Pizza',
              id: mockPizza.id,
              name: mockPizza.name,
              description: mockPizza.description,
              imgSrc: mockPizza.ImgSrc,
              toppings: mockPizza.toppings,
              priceCents: mockPizza.priceCents, //CHECK IF SUPPOSED TO CALL TOPPINGRESOLVER FOR THESE
            },
          ],
        });

        expect(pizzaProvider.getPizzas).toHaveBeenCalledTimes(1);
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
            ImgSrc
            toppingIds
          }
        }
      `;

      const validPizza = createMockPizza({
        name: 'test pizza',
        description: 'description 1',
        ImgSrc: 'img 1',
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
            ImgSrc: validPizza.ImgSrc,
            toppingIds: validPizza.toppings.map((topping) => topping.id),
          },
        };

        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          createPizza: {
            __typename: 'Pizza',
            name: validPizza.name,
            description: validPizza.description,
            ImgSrc: validPizza.ImgSrc,
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
            ImgSrc
            toppings
            priceCents
          }
        }
      `;
      const updatedPizza = createMockPizza({
        name: 'test pizza',
        description: 'description 1',
        ImgSrc: 'img 1',
        toppings: [],
        priceCents: 250,
      });

      const variables: MutationUpdatePizzaArgs = { input: { id: mockPizza.id, name: updatedPizza.name } };
    });
  });
});
