import { IDatabaseCRUD } from "../IDatabaseCRUD";

export interface IUpdateRepository<T extends { id: string }> {
  readonly database: IDatabaseCRUD<T>;
  run(item: T): Promise<T | undefined>
}
