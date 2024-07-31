import { IGetBalancePresenter } from "@/application/interfaces/presenters/IGetBalancePresenter";
import { GetBalanceUseCase } from "@/application/useCases/GetBalanceUseCase";
import { ResponseDTO } from '@/presentation/dtos/ResponseDTO';

export class GetBalancePresenter implements IGetBalancePresenter {
  constructor(private getBalanceUseCase: GetBalanceUseCase) { }

  async run(id: string): Promise<ResponseDTO<number>> {
    var response = new ResponseDTO<number>();

    try {
      var result = await this.getBalanceUseCase.run(id);
      response.code = result === undefined ? 404 : 200;
      response.data = result === undefined ? 0 : result;
    } catch (e) {
      var error = e as Error;
      response.code = 400;
      response.isError = true;
      response.error.msg = 'Error when trying to get the balance';
      response.error.stack = error.stack;
      response.error.originalMsg = error.message
    }
    return response;
  }

}