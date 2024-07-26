import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { makeSut } from "./helpers/makeSut";

describe("GetBalanceUseCase Class Test", () => {
  it('It should call get balance using the right value', async () => {
    var accountExists = true;
    var sut = makeSut(accountExists);

    await sut.getBalanceUseCase.run(sut.account.id);

    expect(sut.findByIdRepositorySpy).toHaveBeenCalledWith(sut.account.id);
  });

  it('It should return the response having the right value', async () => {
    var accountExists = true;
    var sut = makeSut(accountExists);

    var result = await sut.getBalanceUseCase.run(sut.account.id);
    var response = new ResponseDTO<number>();
    response.code = 200;
    response.data = sut.account.balance;


    expect(result).toStrictEqual(response);
  });

  it('It should return error response once the account does not exist', async () => {
    var accountExists = false;
    var sut = makeSut(accountExists);
    var id = `${new Date().getMilliseconds()}`
    var result = await sut.getBalanceUseCase.run(id);
    var response = new ResponseDTO<number>();
    response.code = 404;
    response.data = 0;


    expect(result).toStrictEqual(response);
  });
});