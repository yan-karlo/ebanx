interface IDepositDTOProps{
  destination? : string;
  amount?: number
}
export class DepositEventDTO implements IDepositDTOProps{
  public destination: string;
  public amount: number;
  constructor( data : IDepositDTOProps){
    if(!data.amount || !data.destination){
      throw new Error('DepositEventDTO property is missing')
    }
    this.destination = data.destination;
    this.amount= data.amount;
  }
}