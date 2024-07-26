export class DepositEvent {
  constructor(
    public readonly destination: string,
    public readonly amount: number
  ) { }

}