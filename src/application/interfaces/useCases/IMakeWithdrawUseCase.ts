import { WithdrawEvent } from "@/domain/entities/WithdrawEvent";
import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { WithdrawResponseDTO } from "@/presentation/dtos/WithdrawResponseDTO";

export interface IMakeWithdrawUseCase {
  run(account : WithdrawEvent) : Promise<ResponseDTO<WithdrawResponseDTO | number>>;
}