import { ResetUseCase } from "@/application/useCases/ResetUseCase";
import { ResponseDTO, success, failure } from "../dtos/ResponseDTO";
import { IResetPresenter } from "@/application/interfaces/presenters/IResetPresenter";

export class ResetPresenter implements IResetPresenter {
  constructor(private resetUseCase: ResetUseCase) {}

  async run(): Promise<ResponseDTO<string, Error>> {
    try {
      await this.resetUseCase.run();
      return success(200, "System reset successfully");
    } catch (e) {
      return failure(400, e as Error, 'Error when trying to reset the database');
    }
  }
}
