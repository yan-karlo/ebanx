import { Account } from "@/domain/entities/Account";
import { InMemoryCRUDStrategy } from "@/infrastructure/database/inMemory/inMemoryCRUDStrategy";
import { Database } from "@/infrastructure/database/Database";
import { BalanceController } from "@/presentation/controllers/BalanceController";
import { GetBalanceUseCase } from "@/application/useCases/GetBalanceUseCase";
import { ResetRepository } from "@/domain/repositories/ResetRepository";

export class ResetControllerFactory {
  constructor() { }

  make() {
    var CRUDStrategy = new InMemoryCRUDStrategy<Account>();
    var database = new Database<Account>(CRUDStrategy);
    var resetRepository = new ResetRepository(database);
    var resetUseCase = new GetBalanceUseCase(resetRepository);

    return new BalanceController(resetUseCase);

  }
}