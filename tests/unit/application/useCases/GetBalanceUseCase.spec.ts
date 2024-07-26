import { makeSut } from "./helpers/makeSut";

describe("GetBalanceUseCase Class Test", () => {
  it('It should call get balance using the right value', async () => {
    var accountExists = true;
    var sut = makeSut(accountExists);

    await sut.getBalanceUseCase.run(sut.account.id);

    expect(sut.findByIdRepositorySpy).toHaveBeenCalledWith(sut.account.id);
  });

  it('It should return undefined once the account does not exist', async () => {
    var accountExists = false;
    var sut = makeSut(accountExists);
    var id = `${new Date().getMilliseconds()}`
    var result = await sut.getBalanceUseCase.run(id);

    expect(result).toBeUndefined();
  });
});