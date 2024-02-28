import { Request, Response } from "express";
import { ResetPasswordUseCase } from "./resetPasswordUseCase";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ResetPasswordDTO } from "./resetPasswordDTO";

/**
 * 
 * @class ResetPasswordController
 * @classdesc reset password use case http controller
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class ResetPasswordController extends BaseController<Request> {

  resetPasswordUseCase: ResetPasswordUseCase
  /**
   * Injects the Reset password use case.
   * @param {ResetPasswordUseCase} resetPasswordUseCase 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  constructor(resetPasswordUseCase: ResetPasswordUseCase) {
    super()
    this.resetPasswordUseCase = resetPasswordUseCase
  }

 async executeImpl(req: Request, res: Response): Promise<any> {

    const dto = req.body as ResetPasswordDTO
    const useCaseResponse = await this.resetPasswordUseCase.execute(dto)

    if (useCaseResponse.isLeft()) {
      return this.errorHandler(res, useCaseResponse.value)
    }

    return this.ok(res, {message: "OK"})
 } 
}
