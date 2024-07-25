import exp from "constants";
import { makeSut } from "./helpers/makeSut";

describe("Create Repository Generic Class Test", () => {
  it('It should call the update and findById repositories once the account exists', async () => {
    var accountExists = true;
    var sut = makeSut(accountExists);

    await sut.makeWithdrawUseCase.run(sut.account);

    expect(sut.findByIdRepositorySpy).toHaveBeenCalledWith(sut.account.id);
    expect(sut.updateRepositorySpy).toHaveBeenCalledWith(sut.account);
  });

  it('It should call make a deposit using the right value', async () => {
    var accountExists = true;
    var sut = makeSut(accountExists);
    var expectedFinalBalance = sut.foundAccount.balance - sut.account.balance ;

    await sut.makeWithdrawUseCase.run(sut.account);

    expect(sut.foundAccount.balance).toEqual(expectedFinalBalance);
  });

  it('It should call the create and findById repositories once the account does not exist', async () => {
    var accountExists = false;
    var sut = makeSut(accountExists);

    await sut.makeWithdrawUseCase.run(sut.account);

    expect(sut.findByIdRepositorySpy).toHaveBeenCalledWith(sut.account.id);
    expect(sut.updateRepositorySpy).not.toHaveBeenCalled();
  });

});