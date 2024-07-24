import { MakeDepositUseCase } from "@/application/useCases/MakeDepositUseCase";
import { Account } from "@/domain/entities/Account";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { Database } from "@/infrastructure/database/Database";
import { InMemoryCRUDStrategy } from "@/infrastructure/database/inMemory/inMemoryCRUDStrategy";

export var makeSut = (accountExists: boolean) => {
  const account = new Account('1', 100);
  const foundAccount = new Account('1', 100);
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

  // Dependency Injection
  const makeDepositUseCase = new MakeDepositUseCase(
    database,
    createRepository,
    findByIdRepository,
    updateRepository
  );

  return {
    makeDepositUseCase,
    account,
    foundAccount,
    createRepositorySpy,
    updateRepositorySpy,
    findByIdRepositorySpy,
  }


}