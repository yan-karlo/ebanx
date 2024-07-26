import { Database } from "@/infrastructure/database/Database";

export interface IFindByIdRepository<T extends { id: string }> {
  readonly database: Database<T>;
  run(id: string): Promise<T | undefined>;
}
