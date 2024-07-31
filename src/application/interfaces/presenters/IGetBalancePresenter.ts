import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";

export interface IGetBalancePresenter {
  run(id: string): Promise<ResponseDTO<number>>
}