import { IMakeDepositPresenter } from "@/application/interfaces/presenters/IMakeDepositPresenter";
import { MakeDepositUseCase } from "@/application/useCases/MakeDepositUseCase";
import { DepositEvent } from "@/domain/entities/DepositEvent";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { DepositResponseDTO } from "@/presentation/dtos/DepositResponseDTO";

export class MakeDepositPresenter implements IMakeDepositPresenter {
  constructor(private makeDepositUseCase: MakeDepositUseCase){}

  async run(deposit : DepositEvent): Promise<ResponseDTO<DepositResponseDTO | number>>{
    const response = new ResponseDTO<DepositResponseDTO | number>()
    try {
      const depositReceipt = await this.makeDepositUseCase.run(deposit)
      response.code = 201;
      response.data = new DepositResponseDTO(depositReceipt);
    } catch (e) {
      const error = e as Error;
      response.code = 400;
      response.isError = true;
      response.error.msg = 'Error when trying to make a Deposit';
      response.error.stack = error.stack;
      response.error.originalMsg = error.message
    }

    return response;
  }
}