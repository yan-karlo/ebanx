import { Account } from "@/domain/entities/Account";

interface ITransferResponseDTO {
  origin: Account | null;
  destination: Account | null;
}

export class TransferResponseDTO {
  public origin: Account | null;
  public destination: Account | null;

  constructor({ origin = null, destination = null }: ITransferResponseDTO) {
    this.origin = origin;
    this.destination = destination;
  }
}