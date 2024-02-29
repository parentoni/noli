import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request, Response } from "express";
import { SendPasswordRecoveryTokenUseCase } from "./sendPasswordRecoveryTokenUseCase";
import { SendPasswordRecoveryTokenDTO } from "./sendPasswordRecoveryTokenDTO";

/**
 * 
 * @class SendPasswordRecoveryTokenController
 * @classdesc Class responsible for send password recovery token use case http interaction.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class SendPasswordRecoveryTokenController extends BaseController<Request> {

  sendPasswordRecoveryTokenUseCase: SendPasswordRecoveryTokenUseCase;
  /**
   * Injects sendPasswordRecoveryTokenUseCase
   * @param {SendPasswordRecoveryTokenUseCase} sendPasswordRecoveryTokenUseCase 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  constructor(sendPasswordRecoveryTokenUseCase: SendPasswordRecoveryTokenUseCase) {
    super()
    this.sendPasswordRecoveryTokenUseCase = sendPasswordRecoveryTokenUseCase
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    
    const dto = req.body as SendPasswordRecoveryTokenDTO
    const response = await this.sendPasswordRecoveryTokenUseCase.execute(dto)

    if (response.isLeft()) {
      return this.errorHandler(res, response.value)
    }

    return this.ok(res, {message: "OK"})
  }
}

