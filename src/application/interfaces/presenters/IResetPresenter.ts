import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";

export interface IResetPresenter {
  run(): Promise<ResponseDTO<string>>;
}