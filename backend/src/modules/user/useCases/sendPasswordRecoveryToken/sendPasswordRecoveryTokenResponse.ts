import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either } from "../../../../shared/core/result";

/**
 * 
 * @class CreatePasswordRecoveryTokenResponse
 * @classdesc response for sending password recovery token. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */

export type SendPasswordRecoveryTokenResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, null>
