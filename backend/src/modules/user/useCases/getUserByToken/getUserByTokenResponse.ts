import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either } from "../../../../shared/core/result";
import { IUser } from "../../../../shared/infra/database/models/User";

/**
 * 
 * @class GetUserByTokenResponse
 * @classdesc Response for the use case GetUserByToken. Should return error or persisted user.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export type GetUserByTokenResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.Unathorized | CommonUseCaseResult.UnexpectedError, IUser>;
