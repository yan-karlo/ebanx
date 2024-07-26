import { GetBalanceUseCase } from "@/application/useCases/GetBalanceUseCase";
import { MakeDepositUseCase } from "@/application/useCases/MakeDepositUseCase";
import { MakeTransferUseCase } from "@/application/useCases/MakeTransferUseCase";
import { MakeWithdrawUseCase } from "@/application/useCases/MakeWithdrawUseCase";
import { Account } from "@/domain/entities/Account";
import { DepositEvent } from "@/domain/entities/DepositEvent";
import { TransferEvent } from "@/domain/entities/TransferEvent";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { Database } from "@/infrastructure/database/Database";
import { InMemoryCRUDStrategy } from "@/infrastructure/database/inMemory/inMemoryCRUDStrategy";

export var makeSut = (accountExists: boolean) => {
  const account = new Account('1', 100);
  const foundAccount = new Account('1', 100);
  const depositEvent = new DepositEvent('1', 500);
  const withdrawEvent = new WithdrawEvent('1', 50);
  const result = async (account: Account | string): Promise<Account> => ({ ...(account as Account) });
  const id = accountExists ? account.id : `${new Date().getMilliseconds()}`;
  const findByIdResult =
    async (id: string, accountExists: boolean = true): Promise<Account | undefined> => {
      return accountExists ? foundAccount : undefined
    };

  //Mocking the database methods for not reaching the DB
  var inMemoryCRUDStrategy = new InMemoryCRUDStrategy<Account>();
  const database = new Database<Account>(inMemoryCRUDStrategy);
  database.create = jest.fn().mockResolvedValue(result(account))
  database.update = jest.fn().mockResolvedValue(result(account))
  database.findById = jest.fn().mockResolvedValue(findByIdResult(id, accountExists))
  database.reset = jest.fn().mockResolvedValue(undefined)


  //Mocking all repositories run methods before teh dependency injection
  const createRepository = new CreateRepository<Account>(database);
  const createRepositorySpy = jest.spyOn(createRepository, 'run');
  const updateRepository = new UpdateRepository<Account>(database);
  const updateRepositorySpy = jest.spyOn(updateRepository, 'run');
  const findByIdRepository = new FindByIdRepository<Account>(database);
  const findByIdRepositorySpy = jest.spyOn(findByIdRepository, 'run');

  // Use Cases Dependency Injection
  const makeDepositUseCase = new MakeDepositUseCase(
    database,
    createRepository,
    findByIdRepository,
    updateRepository
  );
  const makeWithdrawUseCase = new MakeWithdrawUseCase(
    database,
    findByIdRepository,
    updateRepository
  );

  const getBalanceUseCase = new GetBalanceUseCase(
    database,
    findByIdRepository,
  );

  return {
    makeDepositUseCase,
    makeWithdrawUseCase,
    getBalanceUseCase,
    account,
    foundAccount,
    depositEvent,
    withdrawEvent,
    createRepositorySpy,
    updateRepositorySpy,
    findByIdRepositorySpy,
  }
}

export var makeSutTransfer = (originExists: boolean, destinationExists: boolean) => {
  const table = new InMemoryCRUDStrategy<Account>();
  const origin = originExists ? new Account('2', 400) : undefined;
  const destination = destinationExists ? new Account('1', 100) : undefined;
  const finalOrigin = originExists ? new Account('2', 300) : undefined;
  const depositEvent = new DepositEvent('1', 500);
  const withdrawEvent = new WithdrawEvent('1', 50);
  const finalDestination = destinationExists ? new Account('1', 200) : undefined;

  const transferEvent = new TransferEvent('2', '1', 100);
  const database = new Database<Account>(table);
  const findByIdRepository = new FindByIdRepository<Account>(database);
  const updateRepository = new UpdateRepository<Account>(database);
  const updateRepositorySpy = jest.spyOn(updateRepository, 'run');
  const findByIdRepositorySpy = jest.spyOn(findByIdRepository, 'run');

  (findByIdRepository.run as jest.Mock)
  .mockResolvedValueOnce(origin)
  .mockResolvedValueOnce(destination);

  (updateRepository.run as jest.Mock)
  .mockImplementation(async (account: Account) => account);

  const makeTransferUseCase = new MakeTransferUseCase(database, findByIdRepository, updateRepository);

  return{
    origin,
    destination,
    finalOrigin,
    finalDestination,
    depositEvent,
    withdrawEvent,
    transferEvent,
    updateRepositorySpy,
    findByIdRepositorySpy,
    makeTransferUseCase,
  }
}