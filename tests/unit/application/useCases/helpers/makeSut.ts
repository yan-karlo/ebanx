import { GetBalanceUseCase } from "@/application/useCases/GetBalanceUseCase";
import { MakeDepositUseCase } from "@/application/useCases/MakeDepositUseCase";
import { MakeTransferUseCase } from "@/application/useCases/MakeTransferUseCase";
import { MakeWithdrawUseCase } from "@/application/useCases/MakeWithdrawUseCase";
import { ResetUseCase } from "@/application/useCases/ResetUseCase";
import { Account } from "@/domain/entities/Account";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { ResetRepository } from "@/domain/repositories/ResetRepository";
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { Database } from "@/infrastructure/database/Database";
import { InMemoryCRUDStrategy } from "@/infrastructure/database/inMemory/inMemoryCRUDStrategy";

export var makeSut = () => {
  const table = new InMemoryCRUDStrategy<Account>();
  const originAccount = new Account('100', 0);
  const destinationAccount = new Account('300', 0);
  const database = new Database<Account>(table);
  const findByIdRepository = new FindByIdRepository<Account>(database);
  const updateRepository = new UpdateRepository<Account>(database);
  const createRepository = new CreateRepository<Account>(database);
  const resetRepository = new ResetRepository<Account>(database);
  const makeDepositUseCase = new MakeDepositUseCase(
    createRepository,
    findByIdRepository,
    updateRepository
  );
  const makeWithdrawUseCase = new MakeWithdrawUseCase(
    findByIdRepository,
    updateRepository
  );
  const makeTransferUseCase = new MakeTransferUseCase(
    findByIdRepository,
    makeDepositUseCase,
    makeWithdrawUseCase
  );
  const resetUseCase = new ResetUseCase(resetRepository);
  const getBalanceUseCase = new GetBalanceUseCase(findByIdRepository);
  const updateRepositorySpy = jest.spyOn(updateRepository, 'run');
  const findByIdRepositorySpy = jest.spyOn(findByIdRepository, 'run');
  const createRepositorySpy = jest.spyOn(createRepository, 'run');
  const resetRepositorySpy = jest.spyOn(resetRepository, 'run');
  const makeDepositUseCaseSpy = jest.spyOn(makeDepositUseCase, 'run');
  const makeWithdrawUseCaseSpy = jest.spyOn(makeWithdrawUseCase, 'run');

  return {
    originAccount,
    destinationAccount,
    database,
    //UseCases
    makeDepositUseCase,
    makeTransferUseCase,
    makeWithdrawUseCase,
    resetUseCase,
    getBalanceUseCase,
    //Repositories
    updateRepository,
    findByIdRepository,
    createRepository,
    resetRepository,
    //Spies-On
    updateRepositorySpy,
    findByIdRepositorySpy,
    createRepositorySpy,
    resetRepositorySpy,
    makeDepositUseCaseSpy,
    makeWithdrawUseCaseSpy,
  }
}