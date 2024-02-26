import { UserRegisterResponse } from "./userRegisterResponse";
import { UserRegisterDTO } from "./userRegisterDTO";
import { UseCase } from "../../../../shared/core/UseCase";
import { IUserRepo } from "../../repo/IUserRepo";
import { IAuthService } from "../../services/IAuthService";
import { UserEmail } from "../../domain/userProps/userEmail";
import { UserPassword } from "../../domain/userProps/userPassword";
import { UserName } from "../../domain/userProps/userName";
import { EitherUtils } from "../../../../shared/utils/EitherUtils";
import { left, right } from "../../../../shared/core/result";
import { UserRegisterErrors } from "./userRegisterErrors";
import { User } from "../../domain/user";

/**
 * 
 * @class UserRegiserUseCase
 * @classdesc User register use case. Should handle register user logic and return an authentication token if successful.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class UserRegisterUseCase implements UseCase<UserRegisterDTO, UserRegisterResponse> {


  userRepo: IUserRepo
  authService: IAuthService

  /**
   * Injects the user repository and the auth service.
   * @param {IUserRepo} userRepo 
   * @param {IAuthService} authService 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  constructor(userRepo: IUserRepo, authService: IAuthService) {
    this.userRepo = userRepo;
    this.authService = authService;
  }

  /**
     * Registers a user
     * @param {UserRegisterDTO} request 
     *
     * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
     */
  async execute(request: UserRegisterDTO): Promise<UserRegisterResponse> {

    // Constructs user props value objects
    const emailOrError = UserEmail.create({email: request.email}) 
    const passwordOrError = UserPassword.create({password: request.password, hashed: false})
    const nameOrError = UserName.create({name: request.name})

    // Returns an error response if any of the value objects are invalid
    const combineResult = EitherUtils.combine([emailOrError, passwordOrError, nameOrError])
    if (combineResult.isLeft()) {
      return left(combineResult.value)
    }

    // Checks if the user already exists
    const userExists = await this.userRepo.findByEmail(request.email)
    if (userExists.isRight() && userExists.value !== null) {
      return left(UserRegisterErrors.UserAlreadyExists(request.email))
    }

    // Creates a new user
    const user = User.create({
      email: emailOrError.getRight(),
      password: passwordOrError.getRight(),
      name: nameOrError.getRight()
    })
    if (user.isLeft()) {
      return left(user.value)
    }

    // Inserts the user into the database
    const userInsert = await this.userRepo.upsert(user.value)
    if (userInsert.isLeft()) {
      return left(userInsert.value)
    }

    // Creates an authentication token
    const token = this.authService.signToken({
      email: user.value.email.value,
      id: user.value.id.toValue()
    })

    return right({token: token})
  }
}
