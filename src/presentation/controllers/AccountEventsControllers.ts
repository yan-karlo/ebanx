import { Request, Response} from "express";
import { Account } from '@/domain/entities/Account';
import { Database } from "@/infrastructure/database/Database";
import { CreateRepository } from "@/domain/repositories/CreateRepository";
import { FindByIdRepository } from '@/domain/repositories/FindByIdRepository';
import { UpdateRepository } from "@/domain/repositories/UpdateRepository";
import { ResetRepository } from '@/domain/repositories/ResetRepository';
import { MakeDepositUseCase } from "@/application/useCases/MakeDepositUseCase";
import { MakeWithdrawUseCase } from '@/application/useCases/MakeWithdrawUseCase';
import { MakeTransferUseCase} from '@/application/useCases/MakeTransferUseCase';
import { GetBalanceUseCase} from "@/application/useCases/GetBalanceUseCase";
import { DepositEvent } from "@/domain/entities/DepositEvent";
import { DepositEventDTO } from "../dtos/DepositEventDTO";
import { WithdrawEventDTO } from "../dtos/WithdrawEventDTO";
import { TransferEventDTO } from "../dtos/TransferEventDTO";

var database = new Database<Account>();
var createRepository = new CreateRepository<Account>(database);
var findByIdRepository = new FindByIdRepository<Account>(database);
var updateRepository = new UpdateRepository<Account>(database);
var resetRepository = new ResetRepository<Account>(database);

export class AccountEventsController{
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
  ){}


  async run(req:Request, res: Response){
    const {type: transaction, ...data } = req.query;
    if(!transaction){
      var { id = '' } = req.query;
      if( typeof id !== 'string') throw new Error('Invalid Id for GetBalance Operation.')
      var result = this.getBalanceUseCase.run(id);
    }
    switch(transaction){
      case "Deposit":{
        var depositEvent = new DepositEventDTO(data)
        this.makeDepositUseCase.run(depositEvent);
      }
      case "Withdraw":{
        var withdrawEvent = new WithdrawEventDTO(data)
        this.makeWithdrawUseCase.run(withdrawEvent);
      }
      case "Transfer":{
        var transferEvent = new TransferEventDTO(data)
        this.makeWithdrawUseCase.run(transferEvent);
      }
    }
  }
}