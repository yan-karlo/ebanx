import { ResponseDTO } from '@/presentation/dtos/ResponseDTO';
import { makeSutTransfer as makeSut } from './helpers/makeSut';

describe("Create Repository Generic Class Test", () => {
  it('It should make the transfer for an axisting account.', async () => {
    var sut = makeSut();

    sut.makeDepositUseCase.run(sut.depositEvent);


    const transferReceipt = await sut.makeTransferUseCase.run(sut.transferEvent);
    // Verify that update was called twice
    expect(transferReceipt.data.).toHaveBeenCalledTimes(2);

    // Verify that update was called with the correct parameters
    expect(sut.updateRepositorySpy).toHaveBeenNthCalledWith(1, expect.objectContaining({
      id: '2',
      balance: 300 // Expected balance after transfer
    }));
    expect(sut.updateRepositorySpy).toHaveBeenNthCalledWith(2, expect.objectContaining({
      id: '1',
      balance: 200 // Expected balance after transfer
    }));
  });

  it('It should refuse to do the transfer because the origin account does not exist.', async () => {
    var originExists = false;
    var destinationExists = true;
    var sut = makeSut(originExists, destinationExists);

    const result = await sut.makeTransferUseCase.run(sut.transferEvent);
    var response = new ResponseDTO<number>();
    response.code = 404;
    response.data = 0;


    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(2);
    expect(sut.updateRepositorySpy).not.toHaveBeenCalled();
    expect(result).toStrictEqual(response);
  });
});
