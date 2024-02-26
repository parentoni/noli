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


  /**
   * Finds a user by email.
   * @param {string} email 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  async findByEmail(email: string): Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, User | null>> {
    try {

      // Finds the user by email
      const user = await UserModel.findOne({ email: email })
      if (user) {

        // Maps the user to a domain user
        const mappedUser = UserMapper.toDomain(user)
        if (mappedUser.isLeft()) {
          return left(mappedUser.value)
        }

        // Returns an user entity if user found and successfully mapped
        return right(mappedUser.value)
      }

      // Returns null if the user is not found
      return right(null)
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }
  }

  /**
   * Finds a user by id.
   * @param {string} id 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  async findById(id: string): Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, User | null>> {
    try {

      // Finds the user by id
      const user = await UserModel.findOne({ _id: id })
      if (user) {

        // Maps the user to a domain user
        const mappedUser = UserMapper.toDomain(user)
        if (mappedUser.isLeft()) {
          return left(mappedUser.value)
        }
        
        // Returns an user entity if user found and successfully mapped
        return right(mappedUser.value)
      }

      // Returns null if the user is not found and no error occurred
      return right(null)
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }
  }
}
