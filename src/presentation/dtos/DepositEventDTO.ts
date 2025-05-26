interface IDepositDTOProps {
  destination?: string;
  amount?: number
}
export class DepositEventDTO implements IDepositDTOProps {
  public destination = '';
  public amount = 0;

  constructor(data: IDepositDTOProps) {
    if (data.amount == undefined || !data.destination) {
      throw new Error(`DepositEventDTO [${data.amount == undefined ? 'amount' : 'destination'}] property is missing.` );
    }
    this.destination = String(data.destination);
    this.amount = data.amount;
  }
}