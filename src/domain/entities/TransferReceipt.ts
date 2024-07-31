import { Account } from "@/domain/entities/Account";

interface ITransferReceipt {
  origin: Account | null;
  destination: Account | null;
}

export class TransferReceipt {
  public origin: Account | null;
  public destination: Account | null;

  constructor({ origin = null, destination = null }: ITransferReceipt =
    { origin: null, destination: null }) {
    this.origin = origin;
    this.destination = destination;
  }
}