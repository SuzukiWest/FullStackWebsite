import { Collection, ObjectId } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { GetPizzasResponse, QueryInput } from '../pizzas/pizza.provider.types';

class CursorProvider {
  private cursor: string;
  constructor() {
    this.cursor = this.resetIndex();
  }

  public getCursorIndex(): string {
    return this.cursor;
  }
  public setCursor(cursor: string): void {
    if (cursor == '') this.cursor = this.resetIndex();
    else this.cursor = cursor;
  }
  public resetIndex(): string {
    return '000000000000000000000000';
  }

  public async getCursorResult(input: QueryInput, pizzas: Collection<PizzaDocument>): Promise<GetPizzasResponse> {
    let { limit } = input;
    const index = this.getCursorIndex();

    if (!limit) limit = 5;
    else limit = limit;

    let result = await pizzas
      .find({ _id: { $gt: new ObjectId(index) } })
      .sort({ _id: 1 })
      .limit(limit)
      .toArray();

    //Remove any undefined objects and convert PizzaDoc to PizzaInp
    result.filter(Boolean);
    const resultRet = result.map(toPizzaObject);

    const totalCount = result.length;

    let hasNextPage: boolean;
    if (totalCount < limit) {
      hasNextPage = false;
    } else hasNextPage = true;

    let cursorPosition = index;
    if (totalCount > 0) {
      cursorPosition = resultRet[totalCount - 1].id;
    }
    if (hasNextPage) this.setCursor(cursorPosition);
    else this.setCursor(this.resetIndex());

    return { hasNextPage: hasNextPage, cursorPosition: cursorPosition, totalCount: totalCount, results: resultRet };
  }
}
export { CursorProvider };
