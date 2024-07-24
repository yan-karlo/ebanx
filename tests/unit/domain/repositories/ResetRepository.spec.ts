import { makeSut } from "./helpers/makeSut";

describe("Reset Repository Generic Class Test", () => {
  it('It should call the Database reset method and not others', async () => {
    var sut = makeSut();

    await sut.resetRepository.run();

    expect(sut.resetSpy).toHaveBeenCalled()
    expect(sut.createSpy).not.toHaveBeenCalled()
    expect(sut.findByIdSpy).not.toHaveBeenCalled()
    expect(sut.updateSpy).not.toHaveBeenCalled()
  });

});