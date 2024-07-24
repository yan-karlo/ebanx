import { Database } from "@/infrastructure/database/Database";

export class FindByIdRepository<T extends {id:string}> {
  constructor(private readonly database : Database<T> = database) {}

  async run(id: string): Promise<T | undefined> {
    return await this.database.findById(id);
  }
}
