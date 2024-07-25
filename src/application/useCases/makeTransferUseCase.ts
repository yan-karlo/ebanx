import { Account } from "@/domain/entities/Account";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { Database } from "@/infrastructure/database/Database";
import { TransferEvent } from "@/domain/entities/TransferEvent";
import { IMakeTransferUseCase } from "../interfaces/useCases/IMakeTransferUseCase";

export class MakeTransferUseCase implements IMakeTransferUseCase {
  constructor(
    private database = new Database<Account>(),
    private findByIdRepository = new FindByIdRepository(this.database),
    private updateRepository = new UpdateRepository(this.database),
  ){}

  async run(transfer : TransferEvent): Promise<(Account | undefined)[]> {
    var origin = await this.findByIdRepository.run(transfer.origin);
    var destination = await this.findByIdRepository.run(transfer.destination);

    var isTransactionNotAllowed =
      origin === undefined
      || destination === undefined
      || origin.balance < transfer.amount
    if(isTransactionNotAllowed){
      return  [origin, destination]
    }

    origin!.balance -= transfer.amount;
    destination!.balance += transfer.amount;

    const newOrigin = await this.updateRepository.run(origin!);
    const newDestination = await this.updateRepository.run(destination!);
    return [newOrigin, newDestination];
  }
}