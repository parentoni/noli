import { ResetPasswordResponse} from "./resetPasswordResponse";
import { ResetPasswordDTO } from "./resetPasswordDTO";
import { UseCase } from "../../../../shared/core/UseCase";
import { IAuthService, TOKEN_TYPES } from "../../services/IAuthService";
import { IUserRepo } from "../../repo/IUserRepo";
import { UserPassword } from "../../domain/userProps/userPassword";
import { left, right } from "../../../../shared/core/result";
import { ResetPasswordErrors } from "./resetPasswordErrors";

/**
 * 
 * @class ResetPasswordResponse
 * @classdesc Use case responsible for ressetting user password, given the token and the new password.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class ResetPasswordUseCase implements UseCase<ResetPasswordDTO, ResetPasswordResponse> {

  authService: IAuthService
  userRepo: IUserRepo

  /**
   * Injects authservice and userrepo
   * @param {IAuthService} authService 
   * @param {IUserRepo} userRepo 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  constructor(authService: IAuthService, userRepo: IUserRepo) {
    this.authService = authService
    this.userRepo = userRepo
  }

  async execute(request: ResetPasswordDTO ): Promise<ResetPasswordResponse> {
      
    // Check if given password is valid
    const newPassword = UserPassword.create({password: request.password, hashed: false})
    if (newPassword.isLeft()) {
      return left(newPassword.value)
    }

    // Find given user by token
    const decodedToken = this.authService.decodeToken(request.token)
    if (decodedToken.isLeft()) {
      return left(decodedToken.value)
    }

    // Find user given token
    const user = await this.userRepo.findById(decodedToken.value.id)
    if (user.isLeft() || user.value === null || decodedToken.value.tokenType !== TOKEN_TYPES.CHANGE_PASSWORD) { // ensures that only reset tokens are being used
      return left(ResetPasswordErrors.UserNotFound())
    }

    // If user was found, substitute props.password for new one
    // Isn't ideal.
    user.value.props.password = newPassword.value

    // Finally, save the user with mutated password
    const saveResult = await this.userRepo.upsert(user.value)
    if (saveResult.isLeft()) {
      return left(saveResult.value)
    }

    return right(null)
  }

}
