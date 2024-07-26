import { Account } from "@/domain/entities/Account";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { Database } from "@/infrastructure/database/Database";
import { TransferEvent } from "@/domain/entities/TransferEvent";
import { IMakeTransferUseCase } from "../interfaces/useCases/IMakeTransferUseCase";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { WithdrawResponseDTO } from "@/presentation/dtos/WithdrawResponseDTO";
import { TransferResponseDTO } from "@/presentation/dtos/TransferResponseDTO";

export class MakeTransferUseCase implements IMakeTransferUseCase {
  constructor(
    private database = new Database<Account>(),
    private findByIdRepository = new FindByIdRepository(this.database),
    private updateRepository = new UpdateRepository(this.database),
  ){}

  async run(transfer : TransferEvent): Promise<ResponseDTO<WithdrawResponseDTO | number>> {
    try {
      var response = new ResponseDTO<WithdrawResponseDTO | number>();

      var origin = await this.findByIdRepository.run(transfer.origin);
      var destination = await this.findByIdRepository.run(transfer.destination);

      var isTransactionNotAllowed =
           origin === undefined
        || destination === undefined
        || origin.balance < transfer.amount
      if(isTransactionNotAllowed){
        response.code = 404;
        response.data = 0;
        return response;
      }

      origin!.balance -= transfer.amount;
      destination!.balance += transfer.amount;
      await this.updateRepository.run(origin!);
      await this.updateRepository.run(destination!);

      response.code = 201;
      response.data = new TransferResponseDTO({origin: origin!, destination: destination!})
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