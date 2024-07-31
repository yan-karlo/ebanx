import { ResponseDTO } from '@/presentation/dtos/ResponseDTO';
import { TransferResponseDTO } from '@/presentation/dtos/TransferResponseDTO';
import { TransferEvent } from '../../../domain/entities/TransferEvent';

export interface IMakeTransferPresenter {
  run(transferEvent : TransferEvent): Promise<ResponseDTO<TransferResponseDTO | number>>
}