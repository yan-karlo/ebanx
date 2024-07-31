import { ResponseDTO } from '@/presentation/dtos/ResponseDTO';
import { WithdrawResponseDTO } from '@/presentation/dtos/WithdrawResponseDTO';
import { WithdrawEvent } from '@/domain/entities/WithdrawEvent';

export interface IMakeWithdrawPresenter {
  run(withdrawEvent : WithdrawEvent): Promise<ResponseDTO<WithdrawResponseDTO | number>>
}