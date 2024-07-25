import { Account } from "@/domain/entities/Account";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { Database } from "@/infrastructure/database/Database";
import { IMakeWithdrawUseCase } from "../interfaces/useCases/IMakeWithdrawUseCase copy";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";

export class MakeWithdrawUseCase implements IMakeWithdrawUseCase{
  constructor(
    private database = new Database<Account>(),
    private findByIdRepository = new FindByIdRepository(this.database),
    private updateRepository = new UpdateRepository(this.database),
  ){}

  async run(withdraw : WithdrawEvent): Promise<Account | undefined> {
    var bankAccount = await this.findByIdRepository.run(withdraw.origin);
    if(bankAccount === undefined){
      return  bankAccount;
    }

    if(bankAccount.balance < withdraw.amount){
      return undefined
    }

    bankAccount.balance -= withdraw.amount;
    return await this.updateRepository.run(bankAccount);
  }
}