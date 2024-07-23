import { Account } from "@/domain/entities/Account";
import { InMemoryDBStrategy } from "@/infrastructure/database/inMemory/inMemoryDBStrategy";

const makeSut = () => {
  var account: Account = {
    id: "1",
    balance: 100,
  };

  return { account };
};

describe("In-Memory Database Strategy", () => {
  var dbMemory: InMemoryDBStrategy;

  beforeAll(() => {
    dbMemory = new InMemoryDBStrategy();
  });
  it("should create an account", () => {
    var sut = makeSut();

    var acc = dbMemory.createAccount(sut.account);
    expect(acc.balance).toBe(sut.account.balance);
  });

  it("should recover an account by Id", () => {
    var sut = makeSut();
    dbMemory.createAccount(sut.account);

    var acc = dbMemory.findAccountById(sut.account.id);
    expect(acc).toBeDefined();
    expect(acc!.balance).toBe(sut.account.balance);
  });

  it("should update an account by Id", () => {
    var sut = makeSut();
    dbMemory.createAccount(sut.account);
    sut.account.balance = 200;

    var acc = dbMemory.updateAccount(sut.account);
    expect(acc).toBeDefined();
    expect(acc!.balance).toBe(200);
  });

  it("should return undefined when updating an not existent user", () => {
    var sut = makeSut();
    sut.account.balance = 200;

    var acc = dbMemory.updateAccount(sut.account);
    expect(acc).toBeUndefined();
  });

  it("should return undefined when account not found", () => {
    var sut = makeSut();

    var acc = dbMemory.findAccountById("2");
    expect(acc).toBeUndefined();
  });

  it("Should reset the table", () => {
    var sut = makeSut();
    dbMemory.createAccount(sut.account);
    dbMemory.reset();

    var acc = dbMemory.findAccountById(sut.account.id);
    expect(acc).toBeUndefined();
  });
});
