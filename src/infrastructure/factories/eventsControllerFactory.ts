import { Account } from "@/domain/entities/Account";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { UpdateRepository } from '@/domain/repositories/UpdateRepository';
import { MakeDepositUseCase } from "@/application/useCases/MakeDepositUseCase";
import { MakeTransferUseCase } from "@/application/useCases/MakeTransferUseCase";
import { EventsController } from "@/presentation/controllers/EventsController";
import { MakeWithdrawUseCase } from "@/application/useCases/MakeWithdrawUseCase";
import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";

export var eventsControllerFactory = (database : IDatabaseCRUD<Account>) => {
    var createRepository = new CreateRepository(database);
    var updateRepository = new UpdateRepository(database);
    var findByIdRepository = new FindByIdRepository(database);
    var makeTransferUseCase = new MakeTransferUseCase(findByIdRepository, updateRepository);
    var makeWithdrawUseCase = new MakeWithdrawUseCase(findByIdRepository, updateRepository);
    var makeDepositUseCase = new MakeDepositUseCase(createRepository, findByIdRepository, updateRepository);

    return new EventsController(makeDepositUseCase, makeWithdrawUseCase, makeTransferUseCase);
}
