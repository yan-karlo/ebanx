import { Account } from "@/domain/entities/Account";
import { IResetUseCase } from "@/application/interfaces/useCases/IResetUseCase";
import { IResetRepository } from "../interfaces/repositories/IResetRepository";

export class ResetUseCase implements IResetUseCase {
  constructor(
    private resetRepository: IResetRepository<Account>,
  ) { }

  async run(): Promise<void> {
    await this.resetRepository.run();
    console.log("reset")
  }
}