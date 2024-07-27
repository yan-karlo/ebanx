import { eventsControllerFactory } from "@/infrastructure/factories/eventsControllerFactory";
import { Application, Router } from "express";
export class EventsRouter {
  public router : Router
  constructor(){
    this.router = Router();
    //this.createRoutes();
  }

  createRoutes(app : Application){
    var eventsController = eventsControllerFactory();
    app.post('/events', eventsController.run)
  }
}