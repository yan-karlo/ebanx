import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";
import { Account } from "@/domain/entities/Account";

export interface IGetBalancePresenter {
  run(id: string): Promise<ResponseDTO<Account, Error>>;
}