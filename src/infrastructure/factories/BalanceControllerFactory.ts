import { Account } from "@/domain/entities/Account";
import { InMemoryCRUDStrategy } from "@/infrastructure/database/inMemory/inMemoryCRUDStrategy";
import { Database } from "@/infrastructure/database/Database";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { BalanceController } from "@/presentation/controllers/BalanceController";
import { GetBalanceUseCase } from "@/application/useCases/GetBalanceUseCase";

export class EventsControllerFactory {
  constructor() { }

  make() {
    var CRUDStrategy = new InMemoryCRUDStrategy<Account>();
    var database = new Database<Account>(CRUDStrategy);
    var findByIdRepository = new FindByIdRepository(database);
    var getBalanceUseCase = new GetBalanceUseCase(findByIdRepository);

    return new BalanceController(getBalanceUseCase);

  }
}