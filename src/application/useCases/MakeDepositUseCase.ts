import { Account } from "@/domain/entities/Account";
import { IMakeDepositUseCase } from "@/application/interfaces/useCases/IMakeDepositUseCase";
import { DepositEvent } from "@/domain/entities/DepositEvent";
import { ICreateRepository } from "@/application/interfaces/repositories/ICreateRepository";
import { IFindByIdRepository } from "@/application/interfaces/repositories/IFindByIdRepository";
import { IUpdateRepository } from '@/application/interfaces/repositories/IUpdateRepository';

export class MakeDepositUseCase implements IMakeDepositUseCase {
  constructor(
    private createRepository: ICreateRepository<Account>,
    private findByIdRepository: IFindByIdRepository<Account>,
    private updateRepository: IUpdateRepository<Account>,
  ) { }

  async run(deposit: DepositEvent): Promise<Account> {
    var result: Account | undefined | null = null;
    var undefinedAccount = new Account('', 0);

    if (deposit.amount <= 0) return undefinedAccount;

    try {
      var destination = await this.findByIdRepository.run(deposit.destination);
      if (destination === undefined) {
        var newAccount = new Account(deposit.destination, deposit.amount);
        result = await this.createRepository.run(newAccount);
      } else {
        destination.balance += deposit.amount;
        result = await this.updateRepository.run(destination);
      }

      return result === undefined ? undefinedAccount : result;

    } catch (e) {
      return undefinedAccount;
    }
  }
}