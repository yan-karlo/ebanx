import { makeSut } from "./helpers/makeSut";

describe("FindById Repository Generic Class Test", () => {
  it('It should call the Database findById method and not others', async () => {
    var sut = makeSut();
    const id = `${new Date().getMilliseconds()}`;
    await sut.findByIdRepository.run(id);

    expect(sut.findByIdSpy).toHaveBeenCalledWith(id)
    expect(sut.createSpy).not.toHaveBeenCalled()
    expect(sut.updateSpy).not.toHaveBeenCalled()
    expect(sut.resetSpy).not.toHaveBeenCalled()
  });

});