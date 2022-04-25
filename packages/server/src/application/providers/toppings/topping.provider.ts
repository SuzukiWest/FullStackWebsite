import { ObjectId, Collection } from 'mongodb';
import { ToppingDocument, toToppingObject } from '../../../entities/topping';
import { CreateToppingInput, Topping, UpdateToppingInput } from './topping.provider.types';
import validateStringInputs from '../../../lib/string-validator';

class ToppingProvider {
  constructor(private collection: Collection<ToppingDocument>) {}

  public async getToppings(): Promise<Topping[]> {
    const toppings = await this.collection.find().sort({ name: 1 }).toArray();
    return toppings.map(toToppingObject);
  }

  public async getToppingsByIds(ids: ObjectId[]): Promise<Topping[]> {
    console.log(ids);
    if (ids.length == 0) throw Error('ToppingIds required for toppings');
    else {
      const toppings = await this.collection
        .find({ _id: { $in: ids } })
        .sort({ name: 1 })
        .toArray();
      return toppings.map(toToppingObject);
    }
  }

  public async getPriceCents(toppings: Topping[]): Promise<number> {
    if (toppings == []) throw Error('Toppings required for priceCents');
    return toppings.reduce((price, currentTopping) => price + currentTopping.priceCents, 0);
  }

  //Confirms toppings exist for Creation or Update of Pizza
  public async validateToppings(toppingIds: ObjectId[]): Promise<void> {
    if (toppingIds.length == 0) throw new Error();

    const toppingObjects = await this.getToppingsByIds(toppingIds);

    if (toppingIds.length != toppingObjects.length) throw new Error();
  }

  public async createTopping(input: CreateToppingInput): Promise<Topping> {
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $set: { ...input, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() } },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not create the ${input.name} topping`);
    }
    const topping = data.value;

    return toToppingObject(topping);
  }

  public async deleteTopping(id: string): Promise<string> {
    const toppingId = new ObjectId(id);

    const toppingData = await this.collection.findOneAndDelete({
      _id: toppingId,
    });

    const topping = toppingData.value;

    if (!topping) {
      throw new Error(`Could not delete the topping`);
    }

    return id;
  }

  public async updateTopping(input: UpdateToppingInput): Promise<Topping> {
    const { id, name, priceCents } = input;

    if (name) validateStringInputs(name);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...(name && { name: name }), ...(priceCents && { priceCents: priceCents }) } },
      { returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not update the topping`);
    }
    const topping = data.value;

    return toToppingObject(topping);
  }
}

export { ToppingProvider };
