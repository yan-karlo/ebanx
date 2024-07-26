import { Account } from "@/domain/entities/Account";
import { IMakeWithdrawUseCase } from "../interfaces/useCases/IMakeWithdrawUseCase";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";
import { WithdrawResponseDTO } from "@/presentation/dtos/WithdrawResponseDTO";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { IFindByIdRepository } from "../interfaces/repositories/IFindByIdRepository";
import { IUpdateRepository } from "../interfaces/repositories/IUpdateRepository";

export class MakeWithdrawUseCase implements IMakeWithdrawUseCase {
  constructor(
    private findByIdRepository: IFindByIdRepository<Account>,
    private updateRepository: IUpdateRepository<Account>,
  ) { }

  async run(withdraw: WithdrawEvent): Promise<ResponseDTO<WithdrawResponseDTO | number>> {
    var response = new ResponseDTO<WithdrawResponseDTO | number>();

    try {
      var bankAccount = await this.findByIdRepository.run(withdraw.origin);
      if (bankAccount === undefined || bankAccount.balance < withdraw.amount) {
        response.code = 404;
        response.data = 0;
        return response;
      }

      bankAccount.balance -= withdraw.amount;
      var result = await this.updateRepository.run(bankAccount);

      response.code = 201;
      response.data = new WithdrawResponseDTO(result);

    } catch (e) {
      var error = e as Error;

      response.code = 400;
      response.isError = true;
      response.error.msg = 'Error when trying to make a withdraw';
      response.error.stack = error.stack;
      response.error.originalMsg = error.message
    }
    return response;
  }
}