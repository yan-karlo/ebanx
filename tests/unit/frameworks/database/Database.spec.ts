import { Account } from "@/domain/entities/Account";
import { Database } from "@/infrastructure/database/Database";
import { InMemoryCRUDStrategy } from '@/infrastructure/database/inMemory/inMemoryCRUDStrategy';

var account: Account = new Account("1", 100)

const makeSut = () => {
  var inMemoryCRUDStrategy = new InMemoryCRUDStrategy<Account>();
  var createSpy = jest.spyOn(inMemoryCRUDStrategy, 'create');
  var updateSpy = jest.spyOn(inMemoryCRUDStrategy, 'update');
  var findByIdSpy = jest.spyOn(inMemoryCRUDStrategy, 'findById');
  var resetSpy = jest.spyOn(inMemoryCRUDStrategy, 'reset');
  const database = (new Database<Account>(inMemoryCRUDStrategy));
  return {
    database,
    createSpy,
    updateSpy,
    findByIdSpy,
    resetSpy
  }
}
describe("Database Generic Class Test", () => {
  it('It should call the DB strategy create method', async () => {
    var sut = makeSut();
    await sut.database.create(account);

    expect(sut.createSpy).toHaveBeenCalledWith(account);
  });

  it('It should updated an account', async () => {
    var sut = makeSut();
    var newModifiedAccount = { ...account }
    newModifiedAccount.balance = 10000
    await sut.database.update(newModifiedAccount);

    expect(sut.updateSpy).toHaveBeenCalledWith(newModifiedAccount)
  });

  it('It should call the DB strategy findById method', async () => {
    var sut = makeSut();
    await sut.database.findById(account.id);

    expect(sut.findByIdSpy).toHaveBeenCalledWith(account.id)
  });

  it('It should call the DB strategy reset method', async () => {
    var sut = makeSut();
    await sut.database.reset();

    expect(sut.resetSpy).toHaveBeenCalled()
  });
})