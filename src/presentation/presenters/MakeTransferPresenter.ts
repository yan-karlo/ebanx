import { IMakeTransferPresenter } from "@/application/interfaces/presenters/IMakeTransferPresenter";
import { MakeTransferUseCase } from "@/application/useCases/MakeTransferUseCase";
import { TransferEvent } from "@/domain/entities/TransferEvent";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { TransferResponseDTO } from "@/presentation/dtos/TransferResponseDTO";

export class MakeTransferPresenter implements IMakeTransferPresenter {
  constructor(private makeTransferUseCase: MakeTransferUseCase) { }

  async run(transfer: TransferEvent): Promise<ResponseDTO<TransferResponseDTO | number>> {
    const response = new ResponseDTO<TransferResponseDTO | number>()
    try {
      const transferReceipt = await this.makeTransferUseCase.run(transfer)
      response.code = transferReceipt.origin === null ? 404 : 201;
      response.data = transferReceipt.origin === null ? 0 : transferReceipt;
    } catch (e) {
      const error = e as Error;
      response.code = 400;
      response.isError = true;
      response.error.msg = 'Error when trying to make a transfer';
      response.error.stack = error.stack;
      response.error.originalMsg = error.message;
    }

    return response;
  }
}