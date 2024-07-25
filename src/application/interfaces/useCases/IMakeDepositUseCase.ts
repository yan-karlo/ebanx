import { Account } from "@/domain/entities/Account";

export interface IMakeDepositUseCase {
  run(account : Account) : Promise<Account | undefined>;
}