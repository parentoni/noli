import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either } from "../../../shared/core/result";
import { User } from "../domain/user";

/**
 * @class IUserRepo
 * @classdesc User repository interface. Should be implemented by the user repository
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export interface IUserRepo {
  upsert(user: User): Promise<Either<CommonUseCaseResult.UnexpectedError, null>>
  findByEmail(email: string): Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, User | null>>
  findById(id: string): Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, User | null>>
}
