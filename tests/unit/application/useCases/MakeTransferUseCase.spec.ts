import { ResponseDTO } from '@/presentation/dtos/ResponseDTO';
import { makeSutTransfer as makeSut, makeSutTransfer } from './helpers/makeSut';

describe("Create Repository Generic Class Test", () => {
  it('It should make the transfer enough time and having the correct parameters', async () => {
    var originExists = true;
    var destinationExists = true;
    var sut = makeSut(originExists, destinationExists);

    await sut.makeTransferUseCase.run(sut.transferEvent);
    // Verify that update was called twice
    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(2);

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
