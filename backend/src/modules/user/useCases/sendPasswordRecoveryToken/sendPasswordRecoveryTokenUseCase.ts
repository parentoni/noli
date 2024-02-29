import { Secrets } from "../../../../config/secretsManager";
import { UseCase } from "../../../../shared/core/UseCase";
import { left, right } from "../../../../shared/core/result";
import { CreatePasswordRecoveryTokenUseCase } from "../createPasswordRecoverytoken/createPasswordRecoveryTokenUseCase";
import { SendPasswordRecoveryTokenDTO } from "./sendPasswordRecoveryTokenDTO";
import { SendPasswordRecoveryTokenResponse } from "./sendPasswordRecoveryTokenResponse";

/**
 * 
 * @class SendPasswordRecoveryTokenUseCase
 * @classdesc Use case responsible for the delivery of the password recovery token
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class SendPasswordRecoveryTokenUseCase implements UseCase<SendPasswordRecoveryTokenDTO, SendPasswordRecoveryTokenResponse> {

  createPasswordRecoveryTokenUseCase: CreatePasswordRecoveryTokenUseCase
  /**
   * Inhects create password recovery token use case.
   * @param {CreatePasswordRecoveryTokenUseCase} createPasswordRecoveryTokenUseCase 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  constructor(createPasswordRecoveryTokenUseCase: CreatePasswordRecoveryTokenUseCase) {
    this.createPasswordRecoveryTokenUseCase = createPasswordRecoveryTokenUseCase
  }

  async execute(request: SendPasswordRecoveryTokenDTO): Promise<SendPasswordRecoveryTokenResponse> {

    // Executes the create password recovery token use case
    const token = await this.createPasswordRecoveryTokenUseCase.execute(request)
    if (token.isLeft()) {
      return left(token.value)
    } 
    
    // determine what service to use based on environment
    if (Secrets.NODE_ENV === 'development') {
      console.log(`[SendPasswordRecoveryTokenUseCase]: ${token.value.token}`)
    } else {
      /**
       *
       *
       * TODO + TESTING
       * TODO + TESTING
       * TODO + TESTING
       * TODO + TESTING
       * TODO + TESTING
       * TODO + TESTING
       *
       *
       * */
    }

    return right(null)
  }
}
