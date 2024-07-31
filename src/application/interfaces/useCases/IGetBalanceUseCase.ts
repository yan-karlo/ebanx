export interface IGetBalanceUseCase {
  run(id: string): Promise<number | undefined>;
}