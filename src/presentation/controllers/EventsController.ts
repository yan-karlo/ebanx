import { Request, Response } from "express";
import { DepositEventDTO } from "@/presentation/dtos/DepositEventDTO";
import { WithdrawEventDTO } from "@/presentation/dtos/WithdrawEventDTO";
import { TransferEventDTO } from "@/presentation/dtos/TransferEventDTO";
import { IMakeDepositPresenter } from "@/application/interfaces/presenters/IMakeDepositPresenter";
import { IMakeWithdrawPresenter } from "@/application/interfaces/presenters/IMakeWithdrawPresenter";
import { IMakeTransferPresenter } from "@/application/interfaces/presenters/IMakeTransferPresenter";
import { DepositResponseDTO } from "@/presentation/dtos/DepositResponseDTO";
import { WithdrawResponseDTO } from "@/presentation/dtos/WithdrawResponseDTO";
import { TransferResponseDTO } from "@/presentation/dtos/TransferResponseDTO";
import { ResponseDTO, failure } from '@/presentation/dtos/ResponseDTO';

export class EventsController {
  constructor(
    private makeDepositPresenter: IMakeDepositPresenter,
    private makeWithdrawPresenter: IMakeWithdrawPresenter,
    private makeTransferPresenter: IMakeTransferPresenter,
  ) {}

  async run(req: Request, res: Response): Promise<Response> {
    const { type: transaction, ...data } = req.body;

    let response: ResponseDTO<
      DepositResponseDTO | WithdrawResponseDTO | TransferResponseDTO,
      Error
    >;

    try {
      switch ((transaction as string)?.toLowerCase()) {
        case "deposit": {
          const depositEvent = new DepositEventDTO(data);
          response = await this.makeDepositPresenter.run(depositEvent);
          break;
        }

        case "withdraw": {
          const withdrawEvent = new WithdrawEventDTO(data);
          response = await this.makeWithdrawPresenter.run(withdrawEvent);
          break;
        }

        case "transfer": {
          const transferEvent = new TransferEventDTO(data);
          response = await this.makeTransferPresenter.run(transferEvent);
          break;
        }

        default: {
          response = failure(400, new Error("Invalid transaction type"), `Invalid transaction type for [${transaction}]`);
          break;
        }
      }
    } catch (err) {
      response = failure(400, err as Error, "Invalid event payload");
    }

    return res.status(response.code).json(response.toJSON());
  }
}
