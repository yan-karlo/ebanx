import { Account } from "@/domain/entities/Account";
import { IGetBalanceUseCase } from "../interfaces/useCases/IGetBalanceUseCase";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { IFindByIdRepository } from "../interfaces/repositories/IFindByIdRepository";

export class GetBalanceUseCase implements IGetBalanceUseCase {
  constructor(
    private findByIdRepository: IFindByIdRepository<Account>,
  ) { }

  async run(id: string): Promise<ResponseDTO<number | undefined>> {
    var response = new ResponseDTO<number | undefined>();
    try {
      var result = await this.findByIdRepository.run(id);
      response.code = result === undefined ? 404 : 200;
      response.data = result === undefined ? 0 : result?.balance

      return response;
    } catch (e) {
      var error = e as Error;
      response.code = 400;
      response.isError = true;
      response.error.msg = 'Error when trying to find an account by id';
      response.error.stack = error.stack;
      response.error.originalMsg = error.message
    }

    return response;
  }
}