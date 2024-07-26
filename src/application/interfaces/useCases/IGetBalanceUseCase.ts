import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";

export interface IGetBalanceUseCase {
  run(id: string): Promise<ResponseDTO<number | undefined>>;
}