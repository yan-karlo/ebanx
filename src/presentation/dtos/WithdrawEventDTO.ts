interface IWithdrawEventDTO{
  origin?: string;
  amount?: number;
}
export class WithdrawEventDTO implements IWithdrawEventDTO{
  public origin : string;
  public amount: number;

constructor(data : IWithdrawEventDTO) {
    if(!data.amount || !data.origin){
      throw new Error('WithdrawEventDTO property is missing')
    }
    this.origin = data.origin;
    this.amount= data.amount;
  }
}