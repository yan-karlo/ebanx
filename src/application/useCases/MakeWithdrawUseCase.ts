import { Account } from "@/domain/entities/Account";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { Database } from "@/infrastructure/database/Database";
import { IMakeWithdrawUseCase } from "../interfaces/useCases/IMakeWithdrawUseCase";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";
import { WithdrawResponseDTO } from "@/presentation/dtos/WithdrawResponseDTO";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";

export class MakeWithdrawUseCase implements IMakeWithdrawUseCase {
  constructor(
    private database = new Database<Account>(),
    private findByIdRepository = new FindByIdRepository(this.database),
    private updateRepository = new UpdateRepository(this.database),
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