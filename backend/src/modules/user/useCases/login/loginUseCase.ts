import { UseCase } from "../../../../shared/core/UseCase";
import { LoginResponse } from "./loginResponse";
import { LoginDTO } from "./loginDTO";
import { UserEmail } from "../../domain/userProps/userEmail";
import { UserPassword } from "../../domain/userProps/userPassword";
import { EitherUtils } from "../../../../shared/utils/EitherUtils";
import { left, right } from "../../../../shared/core/result";
import { IUserRepo } from "../../repo/IUserRepo";
import { IAuthService } from "../../services/IAuthService";
import { LoginErrors } from "./loginErrors";

/**
 * 
 * @class LoginUseCase
 * @classdesc Login use case. Should be used to login a user.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class LoginUseCase implements UseCase<LoginDTO, LoginResponse> {
  authService: IAuthService;
  userRepo: IUserRepo;

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
  
  async execute(request: LoginDTO ): Promise<LoginResponse> {

    //Verify if the input is valid
    const emailOrError = UserEmail.create({ email: request.email });
    const passwordOrError = UserPassword.create({ password: request.password, hashed: false});

    const combineResult = EitherUtils.combine([emailOrError, passwordOrError]);
    if(combineResult.isLeft()) {
      return left(combineResult.value)
    }

    //Defines valid email and password
    const email = emailOrError.getRight()
    const password = passwordOrError.getRight()

    //If input is valid, try to find user with email
    const user = await this.userRepo.findByEmail(email.value);

    if (user.isLeft() || user.value === null) {
      return left(LoginErrors.UserNotFound(email.value))
    }
  
    //If user is found, verify password
    if (!(await user.value.password.compare(password.value))) {
      return left(LoginErrors.InvalidPassword(email.value))
    }

    
    //If password is valid, generate token
    const token = this.authService.signToken({ email: email.value, id: user.value.id.toValue()});
    return right({token: token})

  }
}
