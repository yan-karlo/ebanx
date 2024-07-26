import { IFindByIdRepository } from "@/application/interfaces/repositories/IFindByIdRepository";
import { Database } from "@/infrastructure/database/Database";

export class FindByIdRepository<T extends { id: string }> implements IFindByIdRepository<T> {
  constructor(readonly database: Database<T> = database) { }

  async run(id: string): Promise<T | undefined> {
    return await this.database.findById(id);
  }
}
