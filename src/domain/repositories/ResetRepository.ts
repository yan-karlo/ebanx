import { IResetRepository } from "@/application/interfaces/repositories/IResetRepository";
import { Database } from "@/infrastructure/database/Database";

export class ResetRepository<T extends { id: string }> implements IResetRepository<T>{
  constructor(readonly database: Database<T> = database) { }

  async run(): Promise<undefined> {
    await this.database.reset();
  }
}
