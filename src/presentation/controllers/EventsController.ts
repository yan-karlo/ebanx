import { Request, Response } from "express";
import { DepositEventDTO } from "@/presentation/dtos/DepositEventDTO";
import { WithdrawEventDTO } from "@/presentation/dtos/WithdrawEventDTO";
import { TransferEventDTO } from "@/presentation/dtos/TransferEventDTO";
import { IMakeDepositUseCase } from "@/application/interfaces/useCases/IMakeDepositUseCase";
import { IMakeWithdrawUseCase } from "@/application/interfaces/useCases/IMakeWithdrawUseCase";
import { IMakeTransferUseCase } from "@/application/interfaces/useCases/IMakeTransferUseCase";

export class EventsController {
  constructor(
    private makeDepositUseCase: IMakeDepositUseCase,
    private makeWithdrawUseCase: IMakeWithdrawUseCase,
    private makeTransferUseCase: IMakeTransferUseCase,
  ) { }


  async run(req: Request, res: Response) {
    const { type: transaction, ...data } = req.query;
    switch (transaction) {
      case "Deposit": {
        var depositEvent = new DepositEventDTO(data)
        this.makeDepositUseCase.run(depositEvent);
      }
      case "Withdraw": {
        var withdrawEvent = new WithdrawEventDTO(data)
        this.makeWithdrawUseCase.run(withdrawEvent);
      }
      case "Transfer": {
        var transferEvent = new TransferEventDTO(data)
        this.makeTransferUseCase.run(transferEvent);
      }
    }
  }
}