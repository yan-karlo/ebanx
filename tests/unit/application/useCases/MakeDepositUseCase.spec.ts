import { Account } from "@/domain/entities/Account";
import { makeSut } from "./helpers/makeSut";;
import { DepositEvent } from "@/domain/entities/DepositEvent";

describe("Make Deposit Use Case Test Suite", () => {
  it('It should make a deposit in an existing account', async () => {
    var sut = makeSut();
    var depositAccountAmount = 20;
    var destinationAccount = new Account('D100', 0);
    var depositEvent = new DepositEvent(destinationAccount.id,depositAccountAmount);

    await sut.database.create({...destinationAccount});

    var depositReceipt = await sut.makeDepositUseCase.run(depositEvent);

    expect(depositReceipt.balance).toBe(destinationAccount.balance + depositAccountAmount);
    expect(sut.createRepositorySpy).toHaveBeenCalledTimes(0);
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(sut.updateRepositorySpy).toHaveBeenCalledTimes(1);
  });

  it('It should create a new account make a deposit in it', async () => {
    var sut = makeSut();
    var depositAccountAmount = 20;
    var destinationAccount = new Account('D100', 0);
    var depositEvent = new DepositEvent(destinationAccount.id,depositAccountAmount);

    var depositReceipt = await sut.makeDepositUseCase.run(depositEvent);

    expect(depositReceipt.balance).toBe(destinationAccount.balance + depositAccountAmount);
    expect(sut.createRepositorySpy).toHaveBeenCalled();
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(sut.updateRepositorySpy).toHaveBeenCalledTimes(0);
  });

  it('It should prevent to make a deposit having a negative value', async () => {
    var sut = makeSut();
    var depositAccountAmount = -20;
    var destinationAccount = new Account('D100', 0);
    var depositEvent = new DepositEvent(destinationAccount.id,depositAccountAmount);

    var depositReceipt = await sut.makeDepositUseCase.run(depositEvent);

    expect(depositReceipt.balance).toBe(0);
    expect(depositReceipt.id).toBe('');
    expect(sut.createRepositorySpy).toHaveBeenCalledTimes(0);
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(0);
    expect(sut.updateRepositorySpy).toHaveBeenCalledTimes(0);
  });
});