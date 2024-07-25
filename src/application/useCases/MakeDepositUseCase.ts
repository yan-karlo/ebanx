import { Account } from "@/domain/entities/Account";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { Database } from "@/infrastructure/database/Database";
import { IMakeDepositUseCase } from "../interfaces/useCases/IMakeDepositUseCase";
import { DepositEvent } from "@/domain/entities/DepositEvent";

export class MakeDepositUseCase implements IMakeDepositUseCase {
  constructor(
    private database = new Database<Account>(),
    private createRepository = new CreateRepository(this.database),
    private findByIdRepository = new FindByIdRepository(this.database),
    private updateRepository = new UpdateRepository(this.database),
  ){}

  async run(deposit : DepositEvent): Promise<Account | undefined> {
    var result = await this.findByIdRepository.run(deposit.destination);
    if(result === undefined){
      var newAccount = new Account(deposit.destination, deposit.amount);
      return  await this.createRepository.run(newAccount)
    }

    result.balance += deposit.amount;
    return await this.updateRepository.run(result);
  }
}