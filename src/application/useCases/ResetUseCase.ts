import { Account } from "@/domain/entities/Account";
import { Database } from "@/infrastructure/database/Database";
import { ResetRepository } from "@/domain/repositories/ResetRepository";
import { IResetUseCase } from "@/application/interfaces/useCases/IResetUseCase";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";

export class ResetUseCase implements IResetUseCase {
  constructor(
    private database = new Database<Account>(),
    private resetRepository = new ResetRepository(this.database),
  ) { }

  async run(): Promise<ResponseDTO<string>> {
    await this.resetRepository.run();
    var response = new ResponseDTO<string>();
    response.code = 200;
    response.data = "OK";
    return response;
  }
}