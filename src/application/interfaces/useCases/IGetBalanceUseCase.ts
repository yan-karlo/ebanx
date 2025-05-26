import { Account } from '@/domain/entities/Account';
export interface IGetBalanceUseCase {
  run(id: string): Promise<Account | undefined>;
}