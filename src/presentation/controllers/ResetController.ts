import { Request, Response } from "express";
import { IResetPresenter } from "@/application/interfaces/presenters/IResetPresenter";

export class ResetController {
  constructor(private resetPresenter: IResetPresenter) {}

  async run(req: Request, res: Response): Promise<Response> {
    const response = await this.resetPresenter.run();
    return res.status(response.code).json(response.toJSON());
  }
}
