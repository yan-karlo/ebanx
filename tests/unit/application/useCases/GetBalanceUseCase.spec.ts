import { makeSut } from "./helpers/makeSut";
import { Account } from "@/domain/entities/Account";

describe("Get Balance Use Case Test Suite", () => {
  it('It should get the balance from an existing account.', async () => {
    var sut = makeSut();
    var theAccount = new Account('G100', 100);

    sut.database.create({...theAccount});

    var balanceResult = await sut.getBalanceUseCase.run(theAccount.id);

    expect(balanceResult).toBe(theAccount.balance);
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(sut.createRepositorySpy).toHaveBeenCalledTimes(0);
    expect(sut.updateRepositorySpy).toHaveBeenCalledTimes(0);
  });

  it('It should refuse to get the balance from an no-existing account.', async () => {
    var sut = makeSut();
    var theAccount = new Account('G100', 100);

    var balanceResult = await sut.getBalanceUseCase.run(theAccount.id);

    expect(balanceResult).toBeUndefined();
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(sut.createRepositorySpy).toHaveBeenCalledTimes(0);
    expect(sut.updateRepositorySpy).toHaveBeenCalledTimes(0);
  });
});