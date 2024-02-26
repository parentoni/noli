import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../shared/core/result";
import { IAuthService, TokenPayload } from "./IAuthService";
import { sign, decode, verify } from "jsonwebtoken";

/**
 * 
 * @class JWTAuth
 * @classdesc JWT auth service. Should implement the IAuthService interface. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class JWTAuth implements IAuthService {
  privateKey: string;

  /**
   * Initializes the JWTAuth service.
   * @param {string} privateKey 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  constructor(privateKey:string) {
    this.privateKey = privateKey;
  }

  /**
   * Signs a token.
   * @param {TokenPayload} paylod 
   * @returns {string} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  signToken(paylod: TokenPayload): string {
    return sign(paylod, this.privateKey);
  }


  
  /**
   * Decodes a token.
   * @param {string} token 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  decodeToken(token: string): Either<CommonUseCaseResult.Unathorized, TokenPayload> {
    try {
      const decoded = verify(token, this.privateKey) as TokenPayload; 
      return right(decoded);

    } catch (error) {
      return left(CommonUseCaseResult.Unathorized.create({
        errorMessage: "Invalid token",
        location: "JWTAuth.decodeToken",
        variable: "TOKEN",
      }));
    }
  } 
}
