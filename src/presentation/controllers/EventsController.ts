import { Request, Response } from "express";
import { DepositEventDTO } from "@/presentation/dtos/DepositEventDTO";
import { WithdrawEventDTO } from "@/presentation/dtos/WithdrawEventDTO";
import { TransferEventDTO } from "@/presentation/dtos/TransferEventDTO";
import { IMakeDepositUseCase } from "@/application/interfaces/useCases/IMakeDepositUseCase";
import { IMakeWithdrawUseCase } from "@/application/interfaces/useCases/IMakeWithdrawUseCase";
import { IMakeTransferUseCase } from "@/application/interfaces/useCases/IMakeTransferUseCase";
import { DepositResponseDTO } from "../dtos/DepositResponseDTO";
import { WithdrawResponseDTO } from "../dtos/WithdrawResponseDTO";
import { TransferResponseDTO } from "../dtos/TransferResponseDTO";
import { ResponseDTO } from "../dtos/ResponseDTO";

export class EventsController {
  constructor(
    private makeDepositUseCase: IMakeDepositUseCase,
    private makeWithdrawUseCase: IMakeWithdrawUseCase,
    private makeTransferUseCase: IMakeTransferUseCase,
  ) { }


  async run(req: Request, res: Response): Promise<any> {
    const { type: transaction, ...data } = req.query;
    var response : ResponseDTO< DepositResponseDTO | WithdrawResponseDTO | TransferResponseDTO | number> | null = null;

    switch (transaction) {
      case "Deposit": {
        var depositEvent = new DepositEventDTO(data)
        response = await this.makeDepositUseCase.run(depositEvent);
        break;
      }
      case "Withdraw": {
        var withdrawEvent = new WithdrawEventDTO(data)
        response = await this.makeWithdrawUseCase.run(withdrawEvent);
        break;
      }
      case "Transfer": {
        var transferEvent = new TransferEventDTO(data)
        response = await this.makeTransferUseCase.run(transferEvent);
        break;
      }
      default:
        response = new ResponseDTO<number>;
        response.code = 400;
        response.data = 0
    }

    return res.status(response.code).json(response.data);
  }
}