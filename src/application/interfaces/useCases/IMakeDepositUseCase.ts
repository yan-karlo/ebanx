import { Account } from "@/domain/entities/Account";
import { DepositEvent } from "@/domain/entities/DepositEvent";

export interface IMakeDepositUseCase {
  run(account: DepositEvent): Promise<Account>;
}