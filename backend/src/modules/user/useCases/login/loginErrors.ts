import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError"

/**
 * 
 * @class LoginErrors
 * @classdesca All possible custom LoginErrors. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class LoginErrors {

  public static UserNotFound(email: string): CommonUseCaseResult.InvalidValue {
    return CommonUseCaseResult.InvalidValue.create({
      errorMessage:  `User ${email} not found`,
      location: "LoginErrors.UserNotFound",
      variable: "EMAIL" 
    })
  }

  public static InvalidPassword(email: string): CommonUseCaseResult.Forbidden {
    return CommonUseCaseResult.Forbidden.create({
      errorMessage:  `Invalid password for user ${email}`,
      location: "LoginErrors.InvalidPassword",
      variable: "PASSWORD" 
    })
  }
}

