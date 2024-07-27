import { resetControllerFactory } from "@/infrastructure/factories/resetControllerFactory";
import { Router } from "express";
export class ResetRouter {
  constructor(public router : Router = Router()){}

  createRoutes(){
    var resetController = resetControllerFactory();
    this.router.post('/reset', resetController.run)
  }
}