import { makeSut } from "./helpers/makeSut";;
import { Account } from '@/domain/entities/Account';
import { TransferEvent } from '@/domain/entities/TransferEvent';

describe("Make Transfer Use Case Test Suite", () => {
  it('It should make the transfer for both existing accounts.', async () => {
    var sut = makeSut();
    var transferAmount = 15;
    var origin = await sut.createRepository.run(new Account('T100', 15));
    var destination = await sut.createRepository.run(new Account('T300', 0));
    var transferEvent = new TransferEvent(origin!.id, destination!.id, transferAmount);

    const transferReceipt = await sut.makeTransferUseCase.run(transferEvent);

    expect(transferReceipt.destination!.id).toBe(destination!.id);
    expect(transferReceipt.destination!.balance).toBe(15);
    expect(transferReceipt.origin!.id).toBe(origin!.id);
    expect(transferReceipt.origin!.balance).toBe(0);
    expect(sut.makeDepositUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(sut.makeWithdrawUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(3);
    expect(sut.updateRepositorySpy).toHaveBeenCalledTimes(2);

  });

  it('It should make the transfer for just existing origin account.', async () => {
    var sut = makeSut();
    var transferAmount = 15;
    var origin = await sut.createRepository.run(new Account('T100', 15));
    var destination = new Account('T300', 0);
    var transferEvent = new TransferEvent(origin!.id, destination!.id, transferAmount);
    var newDestination = new Account(destination.id, destination.balance + transferAmount);

    const transferReceipt = await sut.makeTransferUseCase.run(transferEvent);

    expect(transferReceipt.destination!.id).toBe(destination!.id);
    expect(transferReceipt.destination!.balance).toBe(15);
    expect(transferReceipt.origin!.id).toBe(origin!.id);
    expect(transferReceipt.origin!.balance).toBe(0);
    expect(sut.makeDepositUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(sut.makeWithdrawUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(3);
    expect(sut.updateRepositorySpy).toHaveBeenCalledTimes(1);
    expect(sut.createRepositorySpy).toHaveBeenCalledWith(newDestination);
  });

  it('It should refuse to make the transfer for no-existing origin account.', async () => {
    var sut = makeSut();
    var transferAmount = 15;
    var origin = new Account('T100', 15);
    var destination = new Account('T300', 0);
    var transferEvent = new TransferEvent(origin!.id, destination!.id, transferAmount);

    const transferReceipt = await sut.makeTransferUseCase.run(transferEvent);

    expect(transferReceipt.origin).toBeNull();
    expect(transferReceipt.destination).toBeNull();
    expect(sut.makeDepositUseCaseSpy).toHaveBeenCalledTimes(0);
    expect(sut.makeWithdrawUseCaseSpy).toHaveBeenCalledTimes(0);
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(sut.updateRepositorySpy).toHaveBeenCalledTimes(0);
    expect(sut.createRepositorySpy).toHaveBeenCalledTimes(0);
  });
});
