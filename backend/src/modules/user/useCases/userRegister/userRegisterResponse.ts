import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either } from "../../../../shared/core/result";

/**
 * 
 * @class UserRegisterResponse
 * @classdesc User register response. Should be returned by the user register use case. Should be an error or token 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */ 
export type UserRegisterResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, {token: string}>
