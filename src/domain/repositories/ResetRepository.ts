import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";
import { IResetRepository } from "@/application/interfaces/repositories/IResetRepository";

export class ResetRepository<T extends { id: string }> implements IResetRepository<T> {
  constructor(readonly database: IDatabaseCRUD<T> = database) { }

  async run(): Promise<undefined> {
    await this.database.reset();
  }
}
