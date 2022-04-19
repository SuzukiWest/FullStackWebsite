import { ObjectId, Collection } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { CreatePizzaInput, UpdatePizzaInput } from './pizza.provider.types';
import { toppingProvider } from '..';
import validateStringInputs from '../../../lib/string-validator';
import { PizzaInp } from '../../../entities/pizza';

class PizzaProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  public async getPizzas(): Promise<PizzaInp[]> {
    const pizzas = await this.collection.find().sort({ name: 1 }).toArray();
    return pizzas.map(toPizzaObject);
  }

  public async createPizza(input: CreatePizzaInput): Promise<PizzaInp> {
    const { name, description, ImgSrc, toppingIds } = input;
    const strInp = [name, description, ImgSrc];
    if (strInp) validateStringInputs(strInp);

    const toppingIDs = toppingIds.map((topping) => new ObjectId(topping));
    if (toppingIDs) toppingProvider.validateToppings(toppingIDs);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      {
        $set: {
          ...input,
          ...{ imgSrc: ImgSrc },
          ...{ toppingIds: toppingIDs },
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
    const { id, name, description, ImgSrc, toppingIds } = input;
    const strInp = [name, description, ImgSrc];
    if (!strInp) validateStringInputs(strInp);

    //Confirm toppings exist if input
    let toppingIDs: ObjectId[] = [];
    if (toppingIds) {
      toppingIDs = toppingIds!.map((topping) => new ObjectId(topping));
      toppingProvider.validateToppings(toppingIDs);
    }

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(name && { name: name }),
          ...(description && { description: description }),
          ...(ImgSrc && { ImgSrc: ImgSrc }),
          ...(toppingIDs && { toppingIds: toppingIDs }),
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
      throw new Error(`Could not delete the pizza`);
    }

    return id;
  }
}

export { PizzaProvider };
