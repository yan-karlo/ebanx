import { IMakeWithdrawPresenter } from "@/application/interfaces/presenters/IMakeWithdrawPresenter";
import { MakeWithdrawUseCase } from "@/application/useCases/MakeWithdrawUseCase";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";
import { ResponseDTO, success, failure } from "@/presentation/dtos/ResponseDTO";
import { WithdrawResponseDTO } from "@/presentation/dtos/WithdrawResponseDTO";

export class MakeWithdrawPresenter implements IMakeWithdrawPresenter {
  constructor(private makeWithdrawUseCase: MakeWithdrawUseCase) {}

  async run(withdraw: WithdrawEvent): Promise<ResponseDTO<WithdrawResponseDTO, Error>> {
    try {
      const withdrawReceipt = await this.makeWithdrawUseCase.run(withdraw);

      if (!withdrawReceipt.id) {
        return failure(404, new Error('Withdraw not found'), 'Withdraw id missing');
      }

      return success(201, new WithdrawResponseDTO(withdrawReceipt));
    } catch (e) {
      return failure(400, e as Error, 'Error when trying to make a withdraw');
    }
  }
}
