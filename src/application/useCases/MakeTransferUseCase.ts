import { Account } from "@/domain/entities/Account";
import { TransferEvent } from "@/domain/entities/TransferEvent";
import { IMakeTransferUseCase } from "../interfaces/useCases/IMakeTransferUseCase";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { WithdrawResponseDTO } from "@/presentation/dtos/WithdrawResponseDTO";
import { TransferResponseDTO } from "@/presentation/dtos/TransferResponseDTO";
import { IFindByIdRepository } from "../interfaces/repositories/IFindByIdRepository";
import { IUpdateRepository } from "../interfaces/repositories/IUpdateRepository";
import { IMakeDepositUseCase } from "../interfaces/useCases/IMakeDepositUseCase";
import { IMakeWithdrawUseCase } from "../interfaces/useCases/IMakeWithdrawUseCase";
import { WithdrawEventDTO } from "@/presentation/dtos/WithdrawEventDTO";
import { DepositEventDTO } from "@/presentation/dtos/DepositEventDTO";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";
import { DepositEvent } from "@/domain/entities/DepositEvent";
import { IDatabaseCRUD } from '../interfaces/IDatabaseCRUD';

export class MakeTransferUseCase implements IMakeTransferUseCase {
  constructor(
    private findByIdRepository: IFindByIdRepository<Account>,
    private makeDepositUseCase: IMakeDepositUseCase,
    private makeWithdrawUseCase: IMakeWithdrawUseCase,
  ) { }

  async run(transfer: TransferEvent): Promise<ResponseDTO<WithdrawResponseDTO | number>> {
    try {
      var response = new ResponseDTO<WithdrawResponseDTO | number>();

      var origin = await this.findByIdRepository.run(transfer.origin);
      var destination = await this.findByIdRepository.run(transfer.destination);
      console.log({ transfer: { origin, destination } })

      var isTransactionNotAllowed = origin === undefined || origin.balance < transfer.amount
      if (isTransactionNotAllowed) {
        response.code = 404;
        response.data = 0;
        return response;
      }

      var withdraw = new WithdrawEvent(transfer.origin, transfer.amount);
      var deposit = new DepositEvent(transfer.destination, transfer.amount);
      console.log({ transfer_2: { withdraw, deposit } })

      await this.makeWithdrawUseCase.run(withdraw);
      console.log({ transfer_3: { withdraw, deposit } })
      const depositResponse = await this.makeDepositUseCase.run(deposit);
      const withdrawReceipt = new Account(withdraw.origin, origin!.balance)
      const depositReceipt = new Account(
        depositResponse.data?.destination?.id ?? '',
        depositResponse.data?.destination?.balance ?? 0
      );
      response.code = 201;
      response.data = new TransferResponseDTO({origin: withdrawReceipt, destination: depositReceipt })
      return response;

    } catch (e) {
      var error = e as Error;
      var response = new ResponseDTO<WithdrawResponseDTO | number>();
      response.code = 400;
      response.isError = true;
      response.error.msg = 'Error when trying to make a transfer';
      response.error.stack = error.stack;
      response.error.originalMsg = error.message
      return response
    }
  }
}