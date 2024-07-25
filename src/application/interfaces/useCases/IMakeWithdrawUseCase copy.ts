import { Account } from "@/domain/entities/Account";
import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";

export interface IMakeWithdrawUseCase {
  run(account : WithdrawEvent) : Promise<Account | undefined>;
}