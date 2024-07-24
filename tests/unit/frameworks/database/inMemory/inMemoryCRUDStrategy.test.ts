import { Account } from "@/domain/entities/Account";
import { InMemoryCRUDStrategy } from "@/infrastructure/database/inMemory/inMemoryCRUDStrategy";

const makeSut = (account : Account =
   new Account("1", 100)
  ) => {
  return { account };
};

describe("In-Memory Database Strategy", () => {
  var dbMemory: InMemoryCRUDStrategy<Account>;

  beforeAll(() => {
    dbMemory = new InMemoryCRUDStrategy<Account>();
  });
  it("should create an account", async () => {
    var sut = makeSut();

    var acc = await dbMemory.create(sut.account);
    expect(acc.balance).toBe(sut.account.balance);
  });

  it("should recover an account by Id", async () => {
    var sut = makeSut();
    await dbMemory.create(sut.account);

    var acc = await dbMemory.findById(sut.account.id);
    expect(acc).toBeDefined();
    expect(acc!.balance).toBe(sut.account.balance);
  });

  it("should update an account by Id", async () => {
    var sut = makeSut();
    await dbMemory.create(sut.account);
    sut.account.balance = 200;

    var acc = await dbMemory.update(sut.account);
    expect(acc).toBeDefined();
    expect(acc!.balance).toBe(200);
  });

  it("should return undefined when updating an not existent user", async () => {
    var account = new Account(`${new Date().getMilliseconds()}`, 0);
    var acc = await dbMemory.update(account);

    expect(acc).toBeUndefined();
  });

  it("should return undefined when account not found", async () => {
    var sut = makeSut();

    var acc = await dbMemory.findById("2");
    expect(acc).toBeUndefined();
  });

  it("Should reset the table", async () => {
    var sut = makeSut();
    await dbMemory.create(sut.account);
    await dbMemory.reset();

    var acc = await dbMemory.findById(sut.account.id);
    expect(acc).toBeUndefined();
  });
});
