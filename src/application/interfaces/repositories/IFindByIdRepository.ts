import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";

export interface IFindByIdRepository<T extends { id: string }> {
  readonly database: IDatabaseCRUD<T>;
  run(id: string): Promise<T | undefined>;
}
