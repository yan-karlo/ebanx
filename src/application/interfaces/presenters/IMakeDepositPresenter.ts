import { ResponseDTO } from '@/presentation/dtos/ResponseDTO';
import { DepositResponseDTO } from '@/presentation/dtos/DepositResponseDTO';
import { DepositEvent } from '@/domain/entities/DepositEvent';

export interface IMakeDepositPresenter {
  run(depositEvent : DepositEvent): Promise<ResponseDTO<DepositResponseDTO | number>>
}