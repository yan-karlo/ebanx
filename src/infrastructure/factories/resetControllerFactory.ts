import { Account } from "@/domain/entities/Account";
import { ResetRepository } from "@/domain/repositories/ResetRepository";
import { ResetUseCase } from "@/application/useCases/ResetUseCase";
import { ResetController } from "@/presentation/controllers/ResetController";
import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";

export var resetControllerFactory = (database : IDatabaseCRUD<Account>) => {
    var resetRepository = new ResetRepository(database);
    var resetUseCase = new ResetUseCase(resetRepository);

    return new ResetController(resetUseCase);
}