import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";

/**
 * 
 * @class UserRegisterErrors
 * @classdesc User register errors. Should be used to return errors from the user register use case
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class UserRegisterErrors {

  public static UserAlreadyExists(email: string): CommonUseCaseResult.InvalidValue {
    return CommonUseCaseResult.InvalidValue.create({
      errorMessage:  `User ${email} already exists`,
      location: "UserRegisterErrors.UserAlreadyExists",
      variable: "EMAIL" 
    })
  }
}
