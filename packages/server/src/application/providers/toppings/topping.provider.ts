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

  private emptyArrayCheck(array: any[]): void {
    if (!array?.length) throw new Error('Empty input');
  }

  public async getToppingsByIds(ids: string[]): Promise<Topping[]> {
    this.emptyArrayCheck(ids);

    const objectIds = ids.map((id) => new ObjectId(id));
    const toppings = await this.collection
      .find({ _id: { $in: objectIds } })
      .sort({ name: 1 })
      .toArray();
    return toppings.map(toToppingObject);
  }

  public async getPriceCents(ids: string[]): Promise<number> {
    const toppings = await this.getToppingsByIds(ids);
    return toppings.reduce((price, topping) => price + topping.priceCents, 0);
  }

  //Confirms toppings exist for Creation or Update of Pizza
  public async validateToppings(toppingIds: string[] | null | undefined): Promise<void> {
    const toppingObjects = await this.getToppingsByIds(toppingIds!);

    if (toppingIds!.length != toppingObjects.length) throw new Error('Missing requested topping(s)');
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
