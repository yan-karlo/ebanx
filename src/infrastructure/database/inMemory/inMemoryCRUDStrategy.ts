import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";

export class InMemoryCRUDStrategy<T extends { id: string }> implements IDatabaseCRUD<T> {
  private table: Map<string, T> = new Map();

  constructor() { }

  async findById(id: string): Promise<T | undefined> {
    return this.table.get(id);
  }

  async update(item: T): Promise<T | undefined> {
    if (this.table.has(item.id)) {
      this.table.set(item.id, item);
      return item;
    }
    return undefined;
  }

  async create(item: T): Promise<T> {
    this.table.set(item.id, item);
    return item;
  }

  async reset(): Promise<void> {
    this.table.clear();
  }
}
