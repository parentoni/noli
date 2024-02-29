import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";

/**
 * 
 * @class GetUserByTokenErrors
 * @classdesc Errors for the use case GetUserByToken.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class GetUserByTokenErrors {
  public static UserNotFound(): CommonUseCaseResult.InvalidValue {
    return new CommonUseCaseResult.InvalidValue({
      errorMessage: "User not found",
      location: "GetUserByTokenUseCase", 
      variable: "USER"
    });
  }
}
