import { Account } from "@/domain/entities/Account";
import { makeSut } from "./helpers/makeSut";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";

describe("MakeDepositUseCase Class Test Suite", () => {
  it('It should call the update and findById repositories once the account exists', async () => {
    var accountExists = true;
    var sut = makeSut(accountExists);

    await sut.makeDepositUseCase.run(sut.depositEvent);

    expect(sut.createRepositorySpy).not.toHaveBeenCalled();
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledWith(sut.account.id);
    expect(sut.updateRepositorySpy).toHaveBeenCalledWith(sut.foundAccount);
  });

  it('It should call make a deposit using the right value', async () => {
    var accountExists = true;
    var sut = makeSut(accountExists);
    /*
    Heads-up: The account handled by the deposit event (incremental) is
    the returned one from findById mocked method in the sut function
    */
    var expectedFinalBalance = sut.foundAccount.balance + sut.depositEvent.amount;

    await sut.makeDepositUseCase.run(sut.depositEvent);

    expect(sut.foundAccount.balance).toEqual(expectedFinalBalance);
  });

  it('It should call the create and findById repositories once the account does not exist', async () => {
    var accountExists = false;
    var sut = makeSut(accountExists);
    var newAccountCreatedByDeposit = new Account(sut.depositEvent.destination, sut.depositEvent.amount);
    await sut.makeDepositUseCase.run(sut.depositEvent);

    expect(sut.createRepositorySpy).toHaveBeenCalledWith(newAccountCreatedByDeposit);
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledWith(sut.depositEvent.destination);
    expect(sut.updateRepositorySpy).not.toHaveBeenCalled();
  });

  it('It should response when the account does not exist', async () => {
    var accountExists = false;
    var sut = makeSut(accountExists);
    var newAccountCreatedByDeposit = new Account(sut.depositEvent.destination, sut.depositEvent.amount);
    var result = await sut.makeDepositUseCase.run(sut.depositEvent);
    var response = new ResponseDTO<number>();

    response.code = 404;
    response.data = 0;

    expect(response).toStrictEqual(response);
  });

});