import { Account } from "@/domain/entities/Account";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { UpdateRepository } from '@/domain/repositories/UpdateRepository';
import { MakeDepositUseCase } from "@/application/useCases/MakeDepositUseCase";
import { MakeTransferUseCase } from "@/application/useCases/MakeTransferUseCase";
import { EventsController } from "@/presentation/controllers/EventsController";
import { MakeWithdrawUseCase } from "@/application/useCases/MakeWithdrawUseCase";
import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";
import { MakeDepositPresenter } from "@/presentation/presenters/MakeDepositPresenter";
import { MakeWithdrawPresenter } from "@/presentation/presenters/MakeWithdrawPresenter";
import { MakeTransferPresenter } from "@/presentation/presenters/MakeTransferPresenter";

export var eventsControllerFactory = (database: IDatabaseCRUD<Account>) => {
  var createRepository = new CreateRepository(database);
  var updateRepository = new UpdateRepository(database);
  var findByIdRepository = new FindByIdRepository(database);
  var makeWithdrawUseCase = new MakeWithdrawUseCase(findByIdRepository, updateRepository);
  var makeDepositUseCase = new MakeDepositUseCase(createRepository, findByIdRepository, updateRepository);
  var makeTransferUseCase = new MakeTransferUseCase(findByIdRepository, makeDepositUseCase, makeWithdrawUseCase);
  var makeDepositPresenter = new MakeDepositPresenter(makeDepositUseCase);
  var makeWithdrawPresenter = new MakeWithdrawPresenter(makeWithdrawUseCase);
  var makeTransferPresenter = new MakeTransferPresenter(makeTransferUseCase);

  return new EventsController(makeDepositPresenter, makeWithdrawPresenter, makeTransferPresenter);
}
