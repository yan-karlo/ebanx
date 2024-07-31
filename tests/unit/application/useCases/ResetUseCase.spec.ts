import { makeSut } from "./helpers/makeSut";;

describe("Reset Use Case Test Suite", () => {
  it('It should reset the database.', async () => {
    var sut = makeSut();
    await sut.resetUseCase.run();

    expect(sut.findByIdRepositorySpy).toHaveBeenCalledTimes(0);
    expect(sut.createRepositorySpy).toHaveBeenCalledTimes(0);
    expect(sut.updateRepositorySpy).toHaveBeenCalledTimes(0);
    expect(sut.resetRepositorySpy).toHaveBeenCalledTimes(1);
  });
});