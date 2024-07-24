import { Database } from "@/infrastructure/database/Database";

export class UpdateRepository<T extends {id:string}> {
  constructor(private readonly database : Database<T> = database) {}

  async run(item : T): Promise<T | undefined> {
    return await this.database.update(item);
  }
}
