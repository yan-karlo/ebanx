export class TransferEvent {
  constructor(
    public readonly type : string, 
    public readonly origin : string, 
    public readonly destination : string, 
    public readonly amount: number
  ) {}
}