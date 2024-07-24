import { makeSut } from "./helpers/makeSut";

describe("Create Repository Generic Class Test", () => {
  it('It should call the Database create method and not others', async () => {
    var sut = makeSut();

    await sut.createRepository.run(sut.account);

    expect(sut.createSpy).toHaveBeenCalledWith(sut.account)
    expect(sut.findByIdSpy).not.toHaveBeenCalled()
    expect(sut.updateSpy).not.toHaveBeenCalled()
    expect(sut.resetSpy).not.toHaveBeenCalled()
  });

});