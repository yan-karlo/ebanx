import { Account } from "@/domain/entities/Account";
import { IResetUseCase } from "@/application/interfaces/useCases/IResetUseCase";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { IResetRepository } from "../interfaces/repositories/IResetRepository";

export class ResetUseCase implements IResetUseCase {
  constructor(
    private resetRepository: IResetRepository<Account>,
  ) { }

  async run(): Promise<ResponseDTO<string>> {
    await this.resetRepository.run();
    var response = new ResponseDTO<string>();
    response.code = 200;
    response.data = "OK";
    console.log("reset")

    return response;
  }
}