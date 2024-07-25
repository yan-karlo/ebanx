import { Account } from "@/domain/entities/Account";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { Database } from "@/infrastructure/database/Database";
import { IMakeDepositUseCase } from "../interfaces/useCases/IMakeDepositUseCase";

export class MakeDepositUseCase implements IMakeDepositUseCase {
  constructor(
    private database = new Database<Account>(),
    private createRepository = new CreateRepository(this.database),
    private findByIdRepository = new FindByIdRepository(this.database),
    private updateRepository = new UpdateRepository(this.database),
  ){}

  async run(deposit : Account): Promise<Account | undefined> {
    var result = await this.findByIdRepository.run(deposit.id);
    if(result === undefined){
      return  await this.createRepository.run(deposit)
    }

    result.balance += deposit.balance
    return await this.updateRepository.run(result);
  }
}