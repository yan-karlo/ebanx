import { Request, Response } from "express";
import { IResetPresenter } from "@/application/interfaces/presenters/IResetPresenter";

export class ResetController {
  constructor(
    private resetPresenter: IResetPresenter,
  ) { }


  async run(req: Request, res: Response): Promise<void> {
    var response = await this.resetPresenter.run();
    res.status(response.code).send(response.data);
  }
}