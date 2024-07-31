import { Request, Response } from "express";
import { IGetBalancePresenter } from "@/application/interfaces/presenters/IGetBalancePresenter";

export class BalanceController {
  constructor(
    public getBalancePresenter: IGetBalancePresenter,
  ) { }


  async run(req: Request, res: Response): Promise<Response> {
    const id = (req.query.account_id as string) || '';
    var response = await this.getBalancePresenter.run(id);
    return response.isError
      ? res.status(response.code).json(response.errorToJson())
      : res.status(response.code).json(response.data);
  }
}