import { Database } from "@/infrastructure/database/Database";

export interface IResetRepository<T extends { id: string }> {
  readonly database: Database<T>
  run(): Promise<undefined>
}
