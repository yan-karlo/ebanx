import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";

export class Database<T extends { id: string }> implements IDatabaseCRUD<T> {
  constructor(private readonly table: IDatabaseCRUD<T> = table) { }

  async create(item: T): Promise<T> {
    return await this.table.create(item)
  }
  async findById(id: string): Promise<T | undefined> {
    return await this.table.findById(id);
  }
  async update(item: T): Promise<T | undefined> {
    return await this.table.update(item)
  }
  async reset(): Promise<void> {
    await this.table.reset()
  }
}