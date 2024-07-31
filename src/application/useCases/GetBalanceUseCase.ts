import { Account } from "@/domain/entities/Account";
import { IGetBalanceUseCase } from "@/application/interfaces/useCases/IGetBalanceUseCase";
import { IFindByIdRepository } from "@/application/interfaces/repositories/IFindByIdRepository";

export class GetBalanceUseCase implements IGetBalanceUseCase {
  constructor(private findByIdRepository: IFindByIdRepository<Account>) { }

  async run(id: string): Promise<number | undefined> {
    var result = await this.findByIdRepository.run(id);
    console.log({ "balance": result })
    return result?.balance;
  }
}