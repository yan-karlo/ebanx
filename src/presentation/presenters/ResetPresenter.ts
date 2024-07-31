import { ResetUseCase } from "@/application/useCases/ResetUseCase";
import { ResponseDTO } from "../dtos/ResponseDTO";
import { IResetPresenter } from "@/application/interfaces/presenters/IResetPresenter";

export class ResetPresenter implements IResetPresenter{
  constructor(private resetUseCase : ResetUseCase){}

  async run() : Promise<ResponseDTO<string>> {
    var response = new ResponseDTO<string>();
    try {
      this.resetUseCase.run();
      response.code = 200;
      response.data = "OK";

    } catch (e) {
      const error = e as Error;
      response.code = 400;
      response.isError = true;
      response.error.msg = 'Error when trying to reset the database';
      response.error.stack = error.stack;
      response.error.originalMsg = error.message
    }
    return response;
  }
}