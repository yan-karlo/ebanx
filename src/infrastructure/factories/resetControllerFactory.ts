import { Account } from "@/domain/entities/Account";
import { ResetRepository } from "@/domain/repositories/ResetRepository";
import { ResetUseCase } from "@/application/useCases/ResetUseCase";
import { ResetController } from "@/presentation/controllers/ResetController";
import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";
import { ResetPresenter } from "@/presentation/presenters/ResetPresenter";

export var resetControllerFactory = (database: IDatabaseCRUD<Account>) => {
  var resetRepository = new ResetRepository(database);
  var resetUseCase = new ResetUseCase(resetRepository);
  var resetPresenter = new ResetPresenter(resetUseCase);

  return new ResetController(resetPresenter);
}