import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";
import { Account } from "@/domain/entities/Account";
import { balanceControllerFactory } from "@/infrastructure/factories/balanceControllerFactory";
import { Router } from "express";

export class BalanceRouter {
  public router: Router = Router()
  constructor() { }

  createRoutes(database: IDatabaseCRUD<Account>) {
    var balanceController = balanceControllerFactory(database);
    this.router.get('/balance', (req, res) => balanceController.run(req, res));
    return this.router;
  }
}