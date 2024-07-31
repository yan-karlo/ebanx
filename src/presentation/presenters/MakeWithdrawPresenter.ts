import { IMakeWithdrawPresenter } from "@/application/interfaces/presenters/IMakeWithdrawPresenter";
import { MakeWithdrawUseCase } from "@/application/useCases/MakeWithdrawUseCase";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { WithdrawResponseDTO } from "@/presentation/dtos/WithdrawResponseDTO";

export class MakeWithdrawPresenter implements IMakeWithdrawPresenter {
  constructor(private makeWithdrawUseCase: MakeWithdrawUseCase) { }

  async run(Withdraw: WithdrawEvent): Promise<ResponseDTO<WithdrawResponseDTO | number>> {
    const response = new ResponseDTO<WithdrawResponseDTO | number>()
    try {
      const withdrawReceipt = await this.makeWithdrawUseCase.run(Withdraw)
      response.code = withdrawReceipt.id === '' ? 404 : 201;
      response.data = withdrawReceipt.id === '' ? 0 : new WithdrawResponseDTO(withdrawReceipt);
    } catch (e) {
      const error = e as Error;
      response.code = 400;
      response.isError = true;
      response.error.msg = 'Error when trying to make a Withdraw';
      response.error.stack = error.stack;
      response.error.originalMsg = error.message;
    }

    return response;
  }
}