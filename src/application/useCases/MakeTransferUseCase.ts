import { Account } from "@/domain/entities/Account";
import { TransferEvent } from "@/domain/entities/TransferEvent";
import { IMakeTransferUseCase } from "@/application/interfaces/useCases/IMakeTransferUseCase";
import { IFindByIdRepository } from "@/application/interfaces/repositories/IFindByIdRepository";
import { IMakeDepositUseCase } from "@/application/interfaces/useCases/IMakeDepositUseCase";
import { IMakeWithdrawUseCase } from "@/application/interfaces/useCases/IMakeWithdrawUseCase";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";
import { DepositEvent } from "@/domain/entities/DepositEvent";
import { TransferReceipt } from "@/domain/entities/TransferReceipt";

export class MakeTransferUseCase implements IMakeTransferUseCase {
  constructor(
    private findByIdRepository: IFindByIdRepository<Account>,
    private makeDepositUseCase: IMakeDepositUseCase,
    private makeWithdrawUseCase: IMakeWithdrawUseCase,
  ) { }

  async run(transfer: TransferEvent): Promise<TransferReceipt> {
    if (transfer.origin === null) return new TransferReceipt();

    var origin = await this.findByIdRepository.run(transfer.origin);
    var isTransactionNotAllowed = origin === undefined || origin.balance < transfer.amount
    if (isTransactionNotAllowed) {
      return new TransferReceipt();
    }

    var withdraw = new WithdrawEvent(transfer.origin, transfer.amount);
    var deposit = new DepositEvent(transfer.destination, transfer.amount);
    const withdrawReceipt = await this.makeWithdrawUseCase.run(withdraw);
    const depositReceipt = await this.makeDepositUseCase.run(deposit);

    return new TransferReceipt({ origin: withdrawReceipt, destination: depositReceipt })
  }
}