export interface IDatabaseCRUD<T extends {id:string} > {
  create(item: T): Promise<T>;
  findById(id: string): Promise<T | undefined>;
  update(item : T): Promise<T | undefined>;
  reset(): Promise<void>;
}