import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";
import { Account } from "@/domain/entities/Account";
import { resetControllerFactory } from "@/infrastructure/factories/resetControllerFactory";
import { Router } from "express";
export class ResetRouter {
  constructor(public router: Router = Router()) { }

  createRoutes(database: IDatabaseCRUD<Account>) {
    var resetController = resetControllerFactory(database);
    this.router.post('/reset', (req, res) => resetController.run(req, res));
    return this.router
  }
}