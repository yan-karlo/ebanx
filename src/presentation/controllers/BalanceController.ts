import { Request, Response } from "express";
import { DepositEventDTO } from "@/presentation/dtos/DepositEventDTO";
import { WithdrawEventDTO } from "@/presentation/dtos/WithdrawEventDTO";
import { TransferEventDTO } from "@/presentation/dtos/TransferEventDTO";
import { IMakeDepositUseCase } from "@/application/interfaces/useCases/IMakeDepositUseCase";
import { IMakeWithdrawUseCase } from "@/application/interfaces/useCases/IMakeWithdrawUseCase";
import { IMakeTransferUseCase } from "@/application/interfaces/useCases/IMakeTransferUseCase";
import { IGetBalanceUseCase } from "@/application/interfaces/useCases/IGetBalanceUseCase";

export class BalanceController {
  constructor(
    private getBalanceUseCase: IGetBalanceUseCase,
  ) { }


  async run(req: Request, res: Response): Promise<void> {
    const id  = (req.query.id as string) || '';
    var response = await this.getBalanceUseCase.run(id);
    res.status(response.code).json(response.data);
  }
}