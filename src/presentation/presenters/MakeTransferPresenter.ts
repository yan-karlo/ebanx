import { IMakeTransferPresenter } from "@/application/interfaces/presenters/IMakeTransferPresenter";
import { MakeTransferUseCase } from "@/application/useCases/MakeTransferUseCase";
import { TransferEvent } from "@/domain/entities/TransferEvent";
import { ResponseDTO, success, failure } from "@/presentation/dtos/ResponseDTO";
import { TransferResponseDTO } from "@/presentation/dtos/TransferResponseDTO";

export class MakeTransferPresenter implements IMakeTransferPresenter {
  constructor(private makeTransferUseCase: MakeTransferUseCase) {}

  async run(transfer: TransferEvent): Promise<ResponseDTO<TransferResponseDTO, Error>> {
    try {
      const transferReceipt = await this.makeTransferUseCase.run(transfer);

      if (!transferReceipt.origin) {
        return failure(404, new Error('Transfer origin not found'), 'Transfer origin missing');
      }

      return success(201, new TransferResponseDTO(transferReceipt));
    } catch (e) {
      return failure(400, e as Error, 'Error when trying to make a transfer');
    }
  }
}
