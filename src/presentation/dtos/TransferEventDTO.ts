interface ITransferEventDTO {
  origin?: string;
  destination?: string;
  amount?: number;
}
export class TransferEventDTO implements ITransferEventDTO {
  public origin: string;
  public destination: string;
  public amount: number;

  constructor(data: ITransferEventDTO) {

    if (!data.amount || !data.destination || !data.origin) {
      throw new Error(`TransferEventDTO property is missing: DTO: [${JSON.stringify(data)}]`)
    }
    this.origin = data.origin;
    this.amount = data.amount;
    this.destination = data.destination;
  }
}