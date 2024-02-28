import { UseCase } from "../../../../shared/core/UseCase";
import { left, right } from "../../../../shared/core/result";
import { UserEmail } from "../../domain/userProps/userEmail";
import { IUserRepo } from "../../repo/IUserRepo";
import { IAuthService, TOKEN_TYPES } from "../../services/IAuthService";
import { CreatePasswordRecoveryTokenDTO } from "./createPasswordRecoveryTokenDTO";
import { CreatePasswordRecoveryTokenErrors } from "./createPasswordRecoveryTokenErrors";
import { CreatePasswordRecoveryTokenResponse } from "./createPasswordRecoveryTokenResponse";
/**
 * 
 * @class CreatePasswordRecoveryTokenUseCase
 * @classdesc create password recovery token. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class CreatePasswordRecoveryTokenUseCase implements UseCase<CreatePasswordRecoveryTokenDTO, CreatePasswordRecoveryTokenResponse> {
  authService: IAuthService;
  userRepo: IUserRepo;

  /**
     * Injects auth service and user repo.
     * @param {IAuthService} authService 
     * @param {IUserRepo} userRepo 
     *
     * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
     */
  constructor(authService: IAuthService, userRepo: IUserRepo) {
    this.authService = authService
    this.userRepo = userRepo
  }

  async execute(request: CreatePasswordRecoveryTokenDTO ): Promise<CreatePasswordRecoveryTokenResponse> {

    // Check if email is valid
    const email = UserEmail.create({email: request.email})
    if(email.isLeft()) {
      return left(email.value)
    }

    // If email is valid, find user
    const user = await this.userRepo.findByEmail(email.value.value)
    if (user.isLeft() || user.value === null) {
      return left(CreatePasswordRecoveryTokenErrors.UserNotFound(email.value.value))
    }

    // Create password recovery token
    const token = this.authService.signToken({
      id: user.value.id.toValue(),
      email: user.value.email.value,
      tokenType: TOKEN_TYPES.CHANGE_PASSWORD
    })

    return right({token: token})
  }
}
