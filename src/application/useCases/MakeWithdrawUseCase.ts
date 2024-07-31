import { Account } from "@/domain/entities/Account";
import { IMakeWithdrawUseCase } from "@/application/interfaces/useCases/IMakeWithdrawUseCase";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";
import { IFindByIdRepository } from "@/application/interfaces/repositories/IFindByIdRepository";
import { IUpdateRepository } from "@/application/interfaces/repositories/IUpdateRepository";

export class MakeWithdrawUseCase implements IMakeWithdrawUseCase {
  constructor(
    private findByIdRepository: IFindByIdRepository<Account>,
    private updateRepository: IUpdateRepository<Account>,
  ) { }

  async run(withdraw: WithdrawEvent): Promise<Account> {
    var undefinedAccount = new Account('', 0);
    var bankAccount = await this.findByIdRepository.run(withdraw.origin);
    if (bankAccount === undefined || bankAccount.balance < withdraw.amount) {
      return undefinedAccount;
    }

    bankAccount.balance -= withdraw.amount;
    var result = await this.updateRepository.run(bankAccount);
    return result === undefined ? undefinedAccount : result;
  }
}