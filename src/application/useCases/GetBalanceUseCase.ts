import { Account } from "@/domain/entities/Account";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { Database } from "@/infrastructure/database/Database";
import { IGetBalanceUseCase } from "../interfaces/useCases/IGetBalanceUseCase";

export class GetBalanceUseCase implements IGetBalanceUseCase {
  constructor(
    private database = new Database<Account>(),
    private findByIdRepository = new FindByIdRepository(this.database),
  ){}

  async run(id : string): Promise<Number | undefined> {
    var result = await this.findByIdRepository.run(id);
    return result?.balance;
  }
}