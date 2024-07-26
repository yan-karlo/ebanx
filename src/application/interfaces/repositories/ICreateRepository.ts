import { Database } from "@/infrastructure/database/Database";

export interface ICreateRepository<T extends { id: string }> {
 readonly database: Database<T>;
 run(item: T): Promise<T | undefined>
}
