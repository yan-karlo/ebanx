import { Account } from "@/domain/entities/Account";
import { TransferEvent } from "@/domain/entities/TransferEvent";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { WithdrawResponseDTO } from "@/presentation/dtos/WithdrawResponseDTO";

export interface IMakeTransferUseCase {
  run( transfer: TransferEvent): Promise<ResponseDTO<WithdrawResponseDTO | number>>
}