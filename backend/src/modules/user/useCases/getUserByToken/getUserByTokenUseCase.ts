import { UseCase } from "../../../../shared/core/UseCase";
import { left, right } from "../../../../shared/core/result";
import { UserMapper } from "../../mappers/userMapper";
import { IUserRepo } from "../../repo/IUserRepo";
import { IAuthService, TOKEN_TYPES } from "../../services/IAuthService";
import { GetUserByTokenDTO } from "./getUserByTokenDTO";
import { GetUserByTokenErrors } from "./getUserByTokenErrors";
import { GetUserByTokenResponse } from "./getUserByTokenResponse";

/**
 * 
 * @class GetUserByTokenUseCase
 * @classdesc Use case for getting a user info by token. Usefull for middlewares.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class GetUserByTokenUseCase implements UseCase<GetUserByTokenDTO, GetUserByTokenResponse> {
  authService: IAuthService;
    userRepository: IUserRepo;

  /**
   * Injects authService and userRepository.
   * @param {IAuthService} authService 
   * @param {IUserRepo} userRepository 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  constructor(authService: IAuthService, userRepository: IUserRepo) {
    this.authService = authService;
    this.userRepository = userRepository;
  }

  /**
   * Gets a user by token.
   * @param {GetUserByTokenDTO} data 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public async execute(data: GetUserByTokenDTO): Promise<GetUserByTokenResponse> {

    // Get the token payload
    const decodedToken = this.authService.decodeToken(data.token);
    if (decodedToken.isLeft()) {
      return left(decodedToken.value);
    }

    // If token fucntion is not authenticate, returns error
    if (decodedToken.value.tokenType !== TOKEN_TYPES.AUTHENTICATE) {
      return left(GetUserByTokenErrors.UserNotFound())
    }

    // Get the user by id
    const user = await this.userRepository.findById(decodedToken.value.id);
    if (user.isLeft()) {
      return left(user.value);
    }


    //Check if user is null
    if (user.value === null ) {
      return left(GetUserByTokenErrors.UserNotFound());
    }

    // Maps user to persistent
    const userPersistent = await UserMapper.toPersistent(user.value)
    return right(userPersistent);
  }
}
