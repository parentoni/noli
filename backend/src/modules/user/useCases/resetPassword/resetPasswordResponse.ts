import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either } from "../../../../shared/core/result";

/**
 * 
 * @class ResetPasswordResponse
 * @classdesc Reset password response 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export type ResetPasswordResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.Unathorized | CommonUseCaseResult.UnexpectedError, null>
