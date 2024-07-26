export class WithdrawEvent {
  constructor(
    public readonly origin: string,
    public readonly amount: number
  ) { }
}