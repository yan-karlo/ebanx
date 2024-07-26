import { Account } from "@/domain/entities/Account";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { Database } from "@/infrastructure/database/Database";
import { IMakeDepositUseCase } from "../interfaces/useCases/IMakeDepositUseCase";
import { DepositEvent } from "@/domain/entities/DepositEvent";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { DepositResponseDTO } from "@/presentation/dtos/DepositResponseDTO";

export class MakeDepositUseCase implements IMakeDepositUseCase {
  constructor(
    private database = new Database<Account>(),
    private createRepository = new CreateRepository(this.database),
    private findByIdRepository = new FindByIdRepository(this.database),
    private updateRepository = new UpdateRepository(this.database),
  ){}

  async run(deposit : DepositEvent): Promise<ResponseDTO<DepositResponseDTO>> {
    var response = new ResponseDTO<DepositResponseDTO>();
    var result : Account | undefined |  null = null;

    try{
      var destination = await this.findByIdRepository.run(deposit.destination);
      if(destination === undefined){
        var newAccount = new Account(deposit.destination, deposit.amount);
        result = await this.createRepository.run(newAccount);
      } else {
        destination.balance += deposit.amount;
        result = await this.updateRepository.run(destination);
      }

      response.code = 201;
      response.data = new DepositResponseDTO(result);


      return response;
    }catch(e){
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