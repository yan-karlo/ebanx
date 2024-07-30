import { Request, Response } from "express";
import { IGetBalanceUseCase } from "@/application/interfaces/useCases/IGetBalanceUseCase";

export class BalanceController {
  constructor(
    public getBalanceUseCase: IGetBalanceUseCase,
  ) { }


  async run(req: Request, res: Response): Promise<Response> {
    const id  = (req.query.account_id as string) || '';
    var response = await this.getBalanceUseCase.run(id);
    return response.isError
      ? res.status(response.code).json(response.errorToJson())
      : res.status(response.code).json(response.data);
  }
}