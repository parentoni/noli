import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either } from "../../../../shared/core/result";

/**
 * 
 * @class LoginResponse
 * @classdesc All possible login use case responses.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export type LoginResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.Forbidden, {token: string}>;
