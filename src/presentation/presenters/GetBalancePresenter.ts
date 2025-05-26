import { IGetBalancePresenter } from '@/application/interfaces/presenters/IGetBalancePresenter';
import { Account } from '@/domain/entities/Account';
import { ResponseDTO, success, failure } from '@/presentation/dtos/ResponseDTO';

export class GetBalancePresenter implements IGetBalancePresenter {
  constructor(private getBalanceUseCase: GetBalanceUseCase) {}

  async run(id: string): Promise<ResponseDTO<Account, Error>> {
    try {
      const result = await this.getBalanceUseCase.run(id);

      if (!result) {
        return success(404, new Account(id, 0));
      }

      return success(200, result);
    } catch (e) {
      return failure(400, e as Error, 'Error when trying to get the balance');
    }
  }
}
