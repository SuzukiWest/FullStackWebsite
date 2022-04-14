import { ObjectId, Collection } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { Pizza, CreatePizzaInput, UpdatePizzaInput } from './pizza.provider.types';
import { toppingProvider } from '..';
import validateStringInputs from '../../../lib/string-validator';

class PizzaProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  //FIX IMGSRC NOT WORKING - TYPE MISMATCH?
  public async getPizzas(): Promise<Pizza[]> {
    const pizzas = await this.collection.find().toArray();
    return pizzas.map(toPizzaObject);
  }

  public async createPizza(input: CreatePizzaInput): Promise<Pizza> {
    const { name, description, ImgSrc, toppingIds } = input;
    validateStringInputs([name, description, ImgSrc]);

    const toppingIDs = toppingIds.map((topping) => new ObjectId(topping));
    if (toppingIDs) toppingProvider.validateToppings(toppingIDs);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      {
        $set: {
          ...input,
          toppingIds: toppingIDs,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not create the ${input.name} pizza`);
    }
    const pizza = data.value;

    return toPizzaObject(pizza);
  }

  public async deletePizza(id: string): Promise<string> {
    const pizzaId = new ObjectId(id);

    const pizzaData = await this.collection.findOneAndDelete({
      _id: pizzaId,
    });

    const pizza = pizzaData.value;

    if (!pizza) {
      throw new Error(`Could not delete the pizza`);
    }

    return id;
  }

  public async updatePizza(input: UpdatePizzaInput): Promise<Pizza> {
    const { id, name, description, ImgSrc, toppingIds } = input;
    const strInp = [name, description, ImgSrc];
    if (!strInp) validateStringInputs(strInp);

    if (toppingIds) {
      const toppingIDs = toppingIds.map((topping) => new ObjectId(topping));
      toppingProvider.validateToppings(toppingIDs);
    }
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },

      {
        $set: {
          ...(name && { name: name }),
          ...(description && { description: description }),
          ...(ImgSrc && { ImgSrc: ImgSrc }),
        },
      },
      { returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not update the pizza ${name}`);
    }
    const pizza = data.value;

    return toPizzaObject(pizza);
  }
}

export { PizzaProvider };
