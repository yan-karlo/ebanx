import { makeSut } from "./helpers/makeSut";

describe("Update Repository Generic Class Test", () => {
  it('It should call the Database update method and not others', async () => {
    var sut = makeSut();

    await sut.updateRepository.run(sut.account);

    expect(sut.updateSpy).toHaveBeenCalledWith(sut.account)
    expect(sut.createSpy).not.toHaveBeenCalled()
    expect(sut.findByIdSpy).not.toHaveBeenCalled()
    expect(sut.resetSpy).not.toHaveBeenCalled()
  });

});