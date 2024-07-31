import { Account } from "@/domain/entities/Account";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { BalanceController } from "@/presentation/controllers/BalanceController";
import { GetBalanceUseCase } from "@/application/useCases/GetBalanceUseCase";
import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";
import { GetBalancePresenter } from "@/presentation/presenters/GetBalancePresenter";

export var balanceControllerFactory = (database : IDatabaseCRUD<Account>) => {
    var findByIdRepository = new FindByIdRepository<Account>(database);
    var getBalanceUseCase = new GetBalanceUseCase(findByIdRepository);
    var getBalancePresenter = new GetBalancePresenter(getBalanceUseCase);

    return new BalanceController(getBalancePresenter);
}