import { Database } from "@/infrastructure/database/Database";

export class ResetRepository<T extends {id:string}> {
  constructor(private readonly database : Database<T> = database) {}

  async run(): Promise<undefined> {
    await this.database.reset();
  }
}
