import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { LoginUseCase } from "./loginUseCase";
import { Request, Response } from "express";

/**
 * 
 * @class LoginController
 * @classdesc Login controller. Should be used to handle login http requests to loginUseCase. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class LoginController extends BaseController<Request> {
  loginUseCase: LoginUseCase;

  /**
   * Injects the login use case
   * @param {LoginUseCase} loginUseCase 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  constructor(loginUseCase: LoginUseCase) {
    super();
    this.loginUseCase = loginUseCase;
  }

  /**
   * Executes the login use case
   * @param {Request} req 
   * @param {Response} res 
   * @returns {} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  async executeImpl(req: Request, res: Response): Promise<any> {
    const dto = req.body;
    const result = await this.loginUseCase.execute(dto);

    if (result.isLeft()) {
      return this.errorHandler(res, result.value)
    }

    return this.ok(res, result.value);
  }

}
