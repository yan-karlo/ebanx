import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";
import { ICreateRepository } from "@/application/interfaces/repositories/ICreateRepository";
import { Database } from "@/infrastructure/database/Database";

export class CreateRepository<T extends { id: string }> implements ICreateRepository<T> {
  constructor(readonly database: IDatabaseCRUD<T> = database) { }

  async run(item: T): Promise<T | undefined> {
    return await this.database.create(item);
  }
}
