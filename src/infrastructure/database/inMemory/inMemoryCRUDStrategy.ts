import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";

export class InMemoryCRUDStrategy<T extends { id: string }> implements IDatabaseCRUD<T> {
  private table: Map<string, T> = new Map();

  constructor() { }

  async findById(id: string): Promise<T | undefined> {
    var resp = this.table.get(id);
    console.log(`find`,this.table)
    return resp;
  }

  async update(item: T): Promise<T | undefined> {
    if (this.table.has(item.id)) {
      this.table.set(item.id, item);
      console.log(`updated`,this.table)
      return item;
    }
    console.log(`updated`,this.table)
    return undefined;
  }

  async create(item: T): Promise<T> {
    this.table.set(item.id, item);
    console.log(`created`,this.table)
    return item;
  }

  async reset(): Promise<void> {
    this.table.clear();
    console.log(`reset`,this.table)
  }
}
