import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left } from "../../../shared/core/result";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { IUser } from "../../../shared/infra/database/models/User";
import { EitherUtils } from "../../../shared/utils/EitherUtils";
import { User } from "../domain/user";
import { UserEmail } from "../domain/userProps/userEmail";
import { UserName } from "../domain/userProps/userName";
import { UserPassword } from "../domain/userProps/userPassword";
import { UserRole } from "../domain/userProps/userRole";

/**
 * 
 * @class UserMapper
 * @classdesc User mapper class, should allow to map the user entity to persistent, and vice versa 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class UserMapper {

  /**
   * Maps a entity user to a persistent user
   * @param {User} user 
   * @returns {IUser} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  static async toPersistent(user: User): Promise<IUser> {

    // Guarantees that the password is hashed
    let password: UserPassword = user.password;
    if (!password.hashed) {
      password = await password.getHashed();
    }

    return {
      _id: user.id.toValue(),
      name: user.name.value,
      email: user.email.value,
      password: password.value,
      role: user.role.value
    };
  }

  /**
   * @param {IUser} user 
   * @returns {User} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  static toDomain(user: IUser): Either<CommonUseCaseResult.InvalidValue, User> {

    //Create properties
    const idOrError = UniqueGlobalId.createExisting(user._id.toString());
    const emailOrError = UserEmail.create({email: user.email});
    const nameOrError = UserName.create({name: user.name});
    const passwordOrError = UserPassword.create({ password: user.password, hashed: true });
    const roleOrError = UserRole.create({ role: user.role })

    // Guarantees that all the properties are valid
    const combineResult = EitherUtils.combine([emailOrError, nameOrError, passwordOrError, idOrError, roleOrError]);
    if (combineResult.isLeft()) {
      return left(combineResult.value);
    }

    // Create user
    const userOrError = User.create({
      email: emailOrError.getRight(),
      name: nameOrError.getRight(),
      password: passwordOrError.getRight(),
      role: roleOrError.getRight()
    }, idOrError.getRight());

    return userOrError;
  }

  /**
   * Maps a list of entity users to a list of persistent users
   * @param {User[]} users 
   * @returns {IUser[]} 
   */
  static async toPersistentBulk(users: User[]): Promise<IUser[]> {
    //Maps all users to persistent
    const usersToPersistent = users.map(
      async (user) => await this.toPersistent(user)
    );

    // Returns prmoise all 
    return await Promise.all(usersToPersistent);
  }

  /**
   * Maps a list of persistent users to a list of users
   * @param {IUser[]} users 
   * @returns {User[]} 
   */
  static toDomainBulk(users: IUser[]): User[] {
    const domainUsers: User[] = [] 

    //Iterates over all users and maps them to domain
    for (const user of users) {
      const userOrError = this.toDomain(user);

      // Only push if the user is valid
      if (userOrError.isRight()) {
        domainUsers.push(userOrError.value);
      }
    }

    return domainUsers 
  }

}
