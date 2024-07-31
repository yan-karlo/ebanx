import { Request, Response } from "express";
import { DepositEventDTO } from "@/presentation/dtos/DepositEventDTO";
import { WithdrawEventDTO } from "@/presentation/dtos/WithdrawEventDTO";
import { TransferEventDTO } from "@/presentation/dtos/TransferEventDTO";
import { IMakeDepositPresenter } from "@/application/interfaces/presenters/IMakeDepositPresenter";
import { IMakeWithdrawPresenter } from "@/application/interfaces/presenters/IMakeWithdrawPresenter";
import { IMakeTransferPresenter } from "@/application/interfaces/presenters/IMakeTransferPresenter";
import { DepositResponseDTO } from "../dtos/DepositResponseDTO";
import { WithdrawResponseDTO } from "../dtos/WithdrawResponseDTO";
import { TransferResponseDTO } from "../dtos/TransferResponseDTO";
import { ResponseDTO } from "../dtos/ResponseDTO";

export class EventsController {
  constructor(
    private makeDepositPresenter: IMakeDepositPresenter,
    private makeWithdrawPresenter: IMakeWithdrawPresenter,
    private makeTransferPresenter: IMakeTransferPresenter,
  ) { }


  async run(req: Request, res: Response): Promise<any> {
    const { type: transaction, ...data } = req.body;
    var response : ResponseDTO< DepositResponseDTO | WithdrawResponseDTO | TransferResponseDTO | number | string > | null = null;

    switch ((transaction as string).toLowerCase()) {
      case "deposit": {
        var depositEvent = new DepositEventDTO(data)
        response = await this.makeDepositPresenter.run(depositEvent);
        break;
      }
      case "withdraw": {
        var withdrawEvent = new WithdrawEventDTO(data)
        response = await this.makeWithdrawPresenter.run(withdrawEvent);
        break;
      }
      case "transfer": {
        var transferEvent = new TransferEventDTO(data)
        response = await this.makeTransferPresenter.run(transferEvent);
        break;
      }
      default:
        response = new ResponseDTO<number>;
        response.code = 400;
        response.data = 0
    }

    return response.isError
      ? res.status(response.code).json(response.errorToJson())
      : res.status(response.code).json(response.data);
  }
}