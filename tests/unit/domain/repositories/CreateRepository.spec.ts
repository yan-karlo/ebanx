import { Account } from "@/domain/entities/Account";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { Database } from "@/infrastructure/database/Database";
import { InMemoryCRUDStrategy } from '@/infrastructure/database/inMemory/inMemoryCRUDStrategy';

const makeSut = () => {
  const account = new Account('1', 100);
  const result = async (account: Account | string): Promise<Account> => account as Account;
  const id = `${new Date().getMilliseconds()}`;

  var inMemoryCRUDStrategy = new InMemoryCRUDStrategy<Account>();
  const database = new Database<Account>(inMemoryCRUDStrategy);
  const findByIdSpy = jest.spyOn(database, 'findById').mockImplementation(() => result(id));
  const createSpy = jest.spyOn(database, 'create').mockImplementation(() => result(account));
  const updateSpy = jest.spyOn(database, 'update').mockImplementation(() => result(account));
  const resetSpy = jest.spyOn(database, 'reset').mockImplementation();

  const repository = new CreateRepository(database);

  return {
    repository,
    account,
    createSpy,
    updateSpy,
    findByIdSpy,
    resetSpy
  }
}

describe("Create Repository Generic Class Test", () => {
  it('It should call the Database create method and not others', async () => {
    var sut = makeSut();

    await sut.repository.run(sut.account);

    expect(sut.createSpy).toHaveBeenCalledWith(sut.account)
    expect(sut.findByIdSpy).not.toHaveBeenCalled()
    expect(sut.updateSpy).not.toHaveBeenCalled()
    expect(sut.resetSpy).not.toHaveBeenCalled()
  });

});