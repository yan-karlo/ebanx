import { IDatabaseCRUD } from "@/application/interfaces/IDatabaseCRUD";
import { Account } from "@/domain/entities/Account";
import { eventsControllerFactory } from "@/infrastructure/factories/eventsControllerFactory";
import { Router } from "express";

export class EventsRouter {
  public router: Router = Router()
  constructor() { }

  createRoutes(database: IDatabaseCRUD<Account>) {
    var eventsController = eventsControllerFactory(database);
    this.router.post('/event', (req, res) => eventsController.run(req, res));
    return this.router;
  }
}