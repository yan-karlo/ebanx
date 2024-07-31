import { Account } from "@/domain/entities/Account";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { FindByIdRepository } from "@/domain/repositories/FindByIdRepository";
import { ResetRepository } from "@/domain/repositories/ResetRepository";
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { Database } from "@/infrastructure/database/Database";
import { InMemoryCRUDStrategy } from "@/infrastructure/database/inMemory/inMemoryCRUDStrategy";

export var makeSut = () => {
  const account = new Account('1', 100);
  const result = async (account: Account | string): Promise<Account> => account as Account;
  const id = `${new Date().getMilliseconds()}`;

  var inMemoryCRUDStrategy = new InMemoryCRUDStrategy<Account>();
  const database = new Database<Account>(inMemoryCRUDStrategy);
  const findByIdSpy = jest.spyOn(database, 'findById').mockImplementation(() => result(id));
  const createSpy = jest.spyOn(database, 'create').mockImplementation(() => result(account));
  const updateSpy = jest.spyOn(database, 'update').mockImplementation(() => result(account));
  const resetSpy = jest.spyOn(database, 'reset').mockImplementation();

  const createRepository = new CreateRepository(database);
  const updateRepository = new UpdateRepository(database);
  const findByIdRepository = new FindByIdRepository(database);
  const resetRepository = new ResetRepository(database);

  return {
    createRepository,
    updateRepository,
    findByIdRepository,
    resetRepository,
    account,
    createSpy,
    updateSpy,
    findByIdSpy,
    resetSpy
  };
}