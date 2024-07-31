import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";
import { IFindByIdRepository } from "@/application/interfaces/repositories/IFindByIdRepository";

export class FindByIdRepository<T extends { id: string }> implements IFindByIdRepository<T> {
  constructor(readonly database: IDatabaseCRUD<T> = database) { }

  async run(id: string): Promise<T | undefined> {
    return await this.database.findById(id);
  }
}
