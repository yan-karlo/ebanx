import { Account } from "@/domain/entities/Account";

export class DepositResponseDTO {
  public destination: Account | null = null;

  constructor(deposit?: Account) {
    if (deposit) {
      this.destination = new Account(deposit.id, deposit.balance);
    }
  }
}