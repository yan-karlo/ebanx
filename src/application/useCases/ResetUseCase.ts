import { Account } from "@/domain/entities/Account";
import { Database } from "@/infrastructure/database/Database";
import { ResetRepository } from "@/domain/repositories/ResetRepository";
import { IResetUseCase } from "@/application/interfaces/useCases/IResetUseCase";

export class ResetUseCase implements IResetUseCase {
  constructor(
    private database = new Database<Account>(),
    private resetRepository = new ResetRepository(this.database),
  ){}

  async run(): Promise<void> {
    await this.resetRepository.run();
  }
}