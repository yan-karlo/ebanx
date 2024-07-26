import { Request, Response } from "express";
import { Account } from '@/domain/entities/Account';
import { Database } from "@/infrastructure/database/Database";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { FindByIdRepository } from '@/domain/repositories/FindByIdRepository';
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { MakeDepositUseCase } from "@/application/useCases/MakeDepositUseCase";
import { MakeWithdrawUseCase } from '@/application/useCases/MakeWithdrawUseCase';
import { MakeTransferUseCase } from '@/application/useCases/MakeTransferUseCase';
import { GetBalanceUseCase } from "@/application/useCases/GetBalanceUseCase";
import { DepositEventDTO } from "../dtos/DepositEventDTO";
import { WithdrawEventDTO } from "../dtos/WithdrawEventDTO";
import { TransferEventDTO } from "../dtos/TransferEventDTO";

var database = new Database<Account>();
var createRepository = new CreateRepository<Account>(database);
var findByIdRepository = new FindByIdRepository<Account>(database);
var updateRepository = new UpdateRepository<Account>(database);

export class EventsController {
  constructor(
    private makeDepositUseCase = new MakeDepositUseCase(
      database,
      createRepository,
      findByIdRepository,
      updateRepository
    ),
    private makeWithdrawUseCase = new MakeWithdrawUseCase(
      database,
      findByIdRepository,
      updateRepository,
    ),
    private makeTransferUseCase = new MakeTransferUseCase(
      database,
      findByIdRepository,
      updateRepository,
    ),
    private getBalanceUseCase = new GetBalanceUseCase(
      database,
      findByIdRepository,
    )
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
        this.makeWithdrawUseCase.run(transferEvent);
      }
    }
  }
}