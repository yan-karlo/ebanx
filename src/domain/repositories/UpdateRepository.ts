import { IUpdateRepository } from "@/application/interfaces/repositories/IUpdateRepository";
import { Database } from "@/infrastructure/database/Database";

export class UpdateRepository<T extends { id: string }> implements IUpdateRepository<T>{
  constructor(readonly database: Database<T> = database) { }

  async run(item: T): Promise<T | undefined> {
    return await this.database.update(item);
  }
}
