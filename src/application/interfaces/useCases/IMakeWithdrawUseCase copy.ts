import { Account } from "@/domain/entities/Account";

export interface IMakeWithdrawUseCase {
  run(account : Account) : Promise<Account | undefined>;
}