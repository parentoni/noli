import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";

/**
 * 
 * @class ResetPasswordErrors
 * @classdesc Errors for the use case ResetPassword.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class ResetPasswordErrors{
  public static UserNotFound(): CommonUseCaseResult.InvalidValue {
    return new CommonUseCaseResult.InvalidValue({
      errorMessage: "User not found",
      location: "ResetPasswordErrorsUseCase.execute", 
      variable: "USER"
    });
  }
}
