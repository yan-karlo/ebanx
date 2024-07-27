import { balanceControllerFactory } from "@/infrastructure/factories/balanceControllerFactory";
import { Application, Router } from "express";

export class BalanceRouter {
  public router : Router = Router()

  constructor(){
  }

  createRoutes(){
    var balanceController = balanceControllerFactory();
    this.router.post('/balance', balanceController.run)
  }
}