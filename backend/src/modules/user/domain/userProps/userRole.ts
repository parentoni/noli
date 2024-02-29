import { Guard } from "../../../../shared/core/Guard"
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError"
import { Either, Left, left, right } from "../../../../shared/core/result"
import { ValueObject } from "../../../../shared/domain/ValueObject"

/**
 * 
 * @class USER_ROLES
 * @classdesc All possible user roles.
 */
export enum USER_ROLES {
  USER = 0,
  PARTNER = 1,
  ADMIN = 2,
}

/**
 * 
 * @class UserRoleProps
 * @classdesc Props for user role value object 
 */
export type UserRoleProps = {
  role: USER_ROLES
}

/**
 * 
 * @class UserRole
 * @classdesc User role value object.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class UserRole extends ValueObject<UserRoleProps> {

    get value(): USER_ROLES {
      return this.props.role
    }


  /**
   * Validate user input.
   * @param {number} role 
   * @returns {Either<CommonUseCaseResult, null>} 
   *
   */
  private static validate(role: number): Either<CommonUseCaseResult.InvalidValue, null> {

    // Get all numeric values in enum
    const allUserRoles = Object.values(USER_ROLES).filter(el => typeof el === 'string'?false:true) as USER_ROLES[]

    //check if role is valid and is in possible roles
    const guardResult = Guard.isOneOf(role, allUserRoles, "USER_ROLES") 
    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    return right(null)
  }
 
  /**
   * Create user role with validated input.
   * @param {UserRoleProps} props 
   * @returns {Either<CommonUseCaseResult.InvalidValue, UserRole>} 
   */
  public static create(props: UserRoleProps): Either<CommonUseCaseResult.InvalidValue, UserRole> {
    // apply validation
    const validationResult = this.validate(props.role)

    if(validationResult.isLeft()) {
      return left(validationResult.value)
    }

    return right(new UserRole(props))
  }
}
