export class DepositEvent {
  constructor(
    public readonly type : string, 
    public readonly destination : string, 
    public readonly amount: number
  ) {}

}