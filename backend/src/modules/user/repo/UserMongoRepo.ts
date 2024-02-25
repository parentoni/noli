import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../shared/core/result";
import { UserModel } from "../../../shared/infra/database/models/User";
import { User } from "../domain/user";
import { UserMapper } from "../mappers/userMapper";
import { IUserRepo } from "./IUserRepo";

/**
 * 
 * @class UserMongoRepo
 * @classdesc User mongo repository. Should implement the IUserRepo interface.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class UserRepoMongo implements IUserRepo {

  /**
     * Upserts a user
     * @param {User} user 
     *
     * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
     */
  async upsert(user: User): Promise<Either<CommonUseCaseResult.UnexpectedError, null>> {
    try { 
      // Maps the user to a persistent user
      const mappedUser = await UserMapper.toPersistent(user)

      // Upserts the user
      await UserModel.findOneAndUpdate({ _id: mappedUser._id}, mappedUser, { upsert: true })

      return right(null)
    } catch (error) { 
      // Returns an unexpected error if mongo throws an error
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }
  }


}
