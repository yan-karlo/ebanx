import { IMakeDepositPresenter } from "@/application/interfaces/presenters/IMakeDepositPresenter";
import { MakeDepositUseCase } from "@/application/useCases/MakeDepositUseCase";
import { DepositEvent } from "@/domain/entities/DepositEvent";
import { ResponseDTO, success, failure } from "@/presentation/dtos/ResponseDTO";
import { DepositResponseDTO } from "@/presentation/dtos/DepositResponseDTO";

export class MakeDepositPresenter implements IMakeDepositPresenter {
  constructor(private makeDepositUseCase: MakeDepositUseCase) {}

  async run(deposit: DepositEvent): Promise<ResponseDTO<DepositResponseDTO, Error>> {
    try {
      const depositReceipt = await this.makeDepositUseCase.run(deposit);
      return success(201, new DepositResponseDTO(depositReceipt));
    } catch (e) {
      return failure(400, e as Error, 'Error when trying to make a Deposit');
    }
  }
}
