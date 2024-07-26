import { DepositEvent } from "@/domain/entities/DepositEvent";
import { DepositResponseDTO } from "@/presentation/dtos/DepositResponseDTO";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";

export interface IMakeDepositUseCase {
  run(account: DepositEvent): Promise<ResponseDTO<DepositResponseDTO>>;
}