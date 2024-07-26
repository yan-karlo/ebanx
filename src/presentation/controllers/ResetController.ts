import { Request, Response } from "express";
import { IResetUseCase } from "@/application/interfaces/useCases/IResetUseCase";

export class ResetController {
  constructor(
    private resetUseCase: IResetUseCase,
  ) { }


  async run(req: Request, res: Response): Promise<void> {
    var response = await this.resetUseCase.run();
    res.status(response.code).json(response.data);
  }
}