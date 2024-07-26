import exp from "constants";
import { makeSut } from "./helpers/makeSut";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";

describe("Create Repository Generic Class Test", () => {
  it('It should call the update and findById repositories once the account exists', async () => {
    var accountExists = true;
    var sut = makeSut(accountExists);

    await sut.makeWithdrawUseCase.run(sut.withdrawEvent);

    expect(sut.findByIdRepositorySpy).toHaveBeenCalledWith(sut.withdrawEvent.origin);
    expect(sut.updateRepositorySpy).toHaveBeenCalledWith(sut.foundAccount);
  });

  it('It should call make a deposit using the right value', async () => {
    var accountExists = true;
    var sut = makeSut(accountExists);
    var expectedFinalBalance = sut.foundAccount.balance - sut.withdrawEvent.amount;

    await sut.makeWithdrawUseCase.run(sut.withdrawEvent);

    expect(sut.foundAccount.balance).toEqual(expectedFinalBalance);
  });

  it('It should return undefined when the origin account does not exist', async () => {
    var accountExists = false;
    var sut = makeSut(accountExists);

    var result =  await sut.makeWithdrawUseCase.run(sut.withdrawEvent);

    expect(sut.findByIdRepositorySpy).toHaveBeenCalledWith(sut.account.id);
    expect(sut.updateRepositorySpy).not.toHaveBeenCalled();
    expect( result).toBeUndefined()
  });

  it('It should return respond code 404 when the origin account does not has balance enough', async () => {
    var accountExists = false;
    var sut = makeSut(accountExists);
    var bigWithdraw = new WithdrawEvent(sut.account.id,20000);
    var result =  await sut.makeWithdrawUseCase.run(bigWithdraw);
    var response = new ResponseDTO<number>();
    response.code = 404;
    response.data = 0;


    expect(sut.findByIdRepositorySpy).toHaveBeenCalledWith(sut.account.id);
    expect(sut.updateRepositorySpy).not.toHaveBeenCalled();
    expect( result).toStrictEqual(response);
  });

});