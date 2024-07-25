import { Account } from "@/domain/entities/Account";
import { TransferEvent } from "@/domain/entities/TransferEvent";

export interface IMakeTransferUseCase {
  run( transfer: TransferEvent): Promise<(Account | undefined)[]>
}