import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { UserRegisterUseCase } from "./userRegisterUseCase";
import { Request, Response } from "express";

/**
 * 
 * @class UserRegisterController
 * @classdesc User register controller. Should be used to handle user register http requests
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class UserRegisterController extends BaseController<Request>{
  userRegisterUseCase: UserRegisterUseCase;

  /**
   * Injects the user register use case
   * @param {UserRegisterUseCase} userRegisterUseCase 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  constructor(userRegisterUseCase: UserRegisterUseCase) {
    super();
    this.userRegisterUseCase = userRegisterUseCase;
  }

  /**
   * Executes the user register use case
   * @param {Request} req 
   * @param {Response} res 
   * @returns {} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  async executeImpl(req: Request, res: Response): Promise<any>{

    // get the dto
    const dto = req.body;

    // execute the use case
    const result = await this.userRegisterUseCase.execute(dto);

    if (result.isLeft()) {
      return this.errorHandler(res, result.value)
    }

    return this.ok(res, result.value);
  }

}
