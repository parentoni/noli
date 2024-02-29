import { NextFunction, Request, Response } from "express";
import { User } from "../../../../modules/user/domain/user";
import { GetUserByTokenUseCase } from "../../../../modules/user/useCases/getUserByToken/getUserByTokenUseCase";
import { UserMapper } from "../../../../modules/user/mappers/userMapper";
/**
 * 
 * @class AuthenticatedRequest
 * @classdesc Interface to define the authenticated request.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export interface AuthenticatedRequest extends Request {
  user: User
}

/**
 * 
 * @class Middleware
 * @classdesc Class to define the middleware. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class Middleware {
  getUserByToken: GetUserByTokenUseCase;

  /**
   * Injects the get user by token use case.
   * @param {GetUserByTokenUseCase} getUserByToken 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  constructor(getUserByToken: GetUserByTokenUseCase) {
    this.getUserByToken = getUserByToken;
  }

  /**
   * Only allows authenticated users to access the route.
   * @param {AuthenticatedRequest} request 
   * @param {Response} response 
   * @param {NextFunction} next 
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public autheticated() {
    return async (request: Request, response: Response, next: NextFunction) => {
      // Get token from request headers
      const token = request.headers.authorization?.split(' ')[1];

      // Get user by token
      const userByToken = await this.getUserByToken.execute({ token: token || '' });
      if (userByToken.isLeft()) {
        return response.status(401).json(userByToken.value);
      }

      // Map user to domain
      const user = UserMapper.toDomain(userByToken.value);
      if (user.isLeft()) {
        return response.status(401).json(user.value);
      }

      // Set user to request
       
      (request as AuthenticatedRequest).user = user.value;
      next();  
    }
  }
}
