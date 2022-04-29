//Type imports
import { ObjectId, Collection } from 'mongodb';
import { PizzaDocument, toPizzaObject, PizzaInp } from '../../../entities/pizza';
import { ToppingProvider } from '../toppings/topping.provider';
import { toppingProvider } from '..';

//Input Types
import { CreatePizzaInput, UpdatePizzaInput } from './pizza.provider.types';

//Helper function
import validateStringInputs from '../../../lib/string-validator';
import { isString } from 'lodash';

class PizzaProvider {
  constructor(private collection: Collection<PizzaDocument>, private toppingProvider: ToppingProvider) {}

  public async getPizzas(): Promise<PizzaInp[]> {
    const pizzas = await this.collection.find().sort({ name: 1 }).toArray();
    return pizzas.map(toPizzaObject);
  }

  public async createPizza(input: CreatePizzaInput): Promise<PizzaInp> {
    const { name, description, imgSrc, toppingIds } = input;
    const strInp = [name, description, imgSrc];
    validateStringInputs(strInp);

    this.toppingProvider.validateToppings(toppingIds);
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      {
        $set: {
          ...input,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error('Could not create pizza');
    }

    const pizza = data.value;

    return toPizzaObject(pizza);
  }

  public async updatePizza(input: UpdatePizzaInput): Promise<PizzaInp> {
    const { id, name, description, imgSrc, toppingIds } = input;
    const strInp = [name, description, imgSrc].filter(isString);

    if (strInp.length > 0) validateStringInputs(strInp);

    this.toppingProvider.validateToppings(toppingIds);
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(name && { name: name }),
          ...(description && { description: description }),
          ...(imgSrc && { imgSrc: imgSrc }),
          ...(toppingIds && { toppingIds: toppingIds }),
        },
      },
      { returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error('Could not update pizza');
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
      throw new Error(`Could not delete pizza`);
    }

    return id;
  }
}

export { PizzaProvider };
