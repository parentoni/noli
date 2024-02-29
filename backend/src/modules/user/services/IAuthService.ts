import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError"
import { Either } from "../../../shared/core/result"

/**
 * 
 */
export enum TOKEN_TYPES {
  AUTHENTICATE = "AUTHENTICATE",
  CHANGE_PASSWORD = "CHANGE_PASSWORD"
}

/**
 * Payload to be signed in the token
 */
export type TokenPayload = {
  id: string
  email: string
  tokenType: TOKEN_TYPES
}

/**
 * 
 * @class IAuthService
 * @classdesc Auth service interface. Should be implemented by the auth service 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export interface IAuthService {
  signToken: (paylod: TokenPayload) => string,
  decodeToken: (token: string) => Either<CommonUseCaseResult.Unathorized, TokenPayload>
}
