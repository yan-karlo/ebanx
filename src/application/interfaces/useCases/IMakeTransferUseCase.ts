import { TransferEvent } from "@/domain/entities/TransferEvent";
import { TransferReceipt } from "@/domain/entities/TransferReceipt";

export interface IMakeTransferUseCase {
  run(transfer: TransferEvent): Promise<TransferReceipt>;
}