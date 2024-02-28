import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";

/**
 * 
 * @class CreatePasswordRecoveryTokenErrors
 * @classdesc create password recovery use case errors
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class CreatePasswordRecoveryTokenErrors {

  public static UserNotFound(email:string): CommonUseCaseResult.InvalidValue {
    return CommonUseCaseResult.InvalidValue.create({
      location: "CreatePasswordRecoveryTokenUseCase.execute",
      variable: "EMAIL",
      errorMessage: `User with given email ${email} was not found`
    })
  }
}
