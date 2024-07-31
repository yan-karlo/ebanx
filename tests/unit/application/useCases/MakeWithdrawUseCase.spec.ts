import { Account } from "@/domain/entities/Account";
import { makeSut } from "./helpers/makeSut";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";

describe("Make Withdraw Use Case Test Suite", () => {
  it('It should make withdraw in an existing account.', async () => {
    var sut = makeSut();
    var withdrawAccountAmount = 20;
    var originAccount = new Account('W100', 100);
    var withdrawEvent = new WithdrawEvent(originAccount.id,withdrawAccountAmount);

    sut.database.create({...originAccount});

    var withdrawReceipt = await sut.makeWithdrawUseCase.run(withdrawEvent);

    expect(withdrawReceipt.balance).toBe(originAccount.balance - withdrawAccountAmount);
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(sut.updateRepositorySpy).toHaveBeenCalledTimes(1);
    expect(sut.createRepositorySpy).toHaveBeenCalledTimes(0);
  });

  it('It should prevent to make withdraw in an no-existing account.', async () => {
    var sut = makeSut();
    var withdrawAccountAmount = 20;
    var originAccount = new Account('W100', 100);
    var withdrawEvent = new WithdrawEvent(originAccount.id,withdrawAccountAmount);

    var withdrawReceipt = await sut.makeWithdrawUseCase.run(withdrawEvent);

    expect(withdrawReceipt.id).toBe('');
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(sut.updateRepositorySpy).toHaveBeenCalledTimes(0);
    expect(sut.createRepositorySpy).toHaveBeenCalledTimes(0);
  });
});