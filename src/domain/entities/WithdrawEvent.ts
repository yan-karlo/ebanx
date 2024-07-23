export class WithdrawEvent {
  constructor(
    public readonly type : string, 
    public readonly origin : string, 
    public readonly amount: number
  ) {}
}