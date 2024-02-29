import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either } from "../../../../shared/core/result";

/**
 * 
 * @class CreatePasswordRecoveryTokenResponse
 * @classdesc response for create password recovery token. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export type CreatePasswordRecoveryTokenResponse = Either<CommonUseCaseResult.InvalidValue, {token: string}>
