import { ResponseDTO } from "@/presentation/dtos/ResponseDTO";

export interface IResetUseCase {
  run(): Promise<ResponseDTO<string>>;
}