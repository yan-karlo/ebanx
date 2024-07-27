import { IDatabaseCRUD } from "../IDatabaseCRUD";

export interface IResetRepository<T extends { id: string }> {
  readonly database: IDatabaseCRUD<T>
  run(): Promise<undefined>
}
