import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";
import { IUpdateRepository } from "@/application/interfaces/repositories/IUpdateRepository";

export class UpdateRepository<T extends { id: string }> implements IUpdateRepository<T> {
  constructor(readonly database: IDatabaseCRUD<T> = database) { }

  async run(item: T): Promise<T | undefined> {
    return await this.database.update(item);
  }
}
