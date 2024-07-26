import { Account } from "@/domain/entities/Account";

export class WithdrawResponseDTO {
  public origin: Account | null = null;

  constructor(withdraw?: Account) {
    if (withdraw) {
      this.origin = new Account(withdraw.id, withdraw.balance)
    }
  }
}