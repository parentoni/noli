import { Guard } from "../../../../shared/core/Guard"
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError"
import { Either, left, right } from "../../../../shared/core/result"
import { ValueObject } from "../../../../shared/domain/ValueObject"
import { TextUtils } from "../../../../shared/utils/TextUtils"

/**
 * User name required props 
 */
export type UserNameProps = {
  name: string
}

/**
 * 
 * @class UserName
 * @classdesc User name value object. Should handle all validation and santization logic. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class UserName extends ValueObject<UserNameProps> {

  // Name length
  static MIN_LENGTH = 2
  static MAX_LENGTH = 280

  get value(): string {
    return this.props.name
  }

  /**
   * @param {string} name 
   * @returns {string} sanitized name
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  private static validate(name: string): Either<CommonUseCaseResult.InvalidValue, string> {
    //Apply trimming
    const sanitized = TextUtils.trim(name)

    // Check name length
    const guardResult = Guard.inRange(sanitized.length, this.MIN_LENGTH, this.MAX_LENGTH, "NAME_LENGTH")
    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    // return sanitized text
    return right(sanitized)
  }

  /**
   * Creates validated user name
   * @param {UserNameProps} props 
   * @returns {Either<CommonUseCaseResult.InvalidValue, UserName>} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public static create(props: UserNameProps): Either<CommonUseCaseResult.InvalidValue, UserName> {
    // Apply validation
    const validatioResult = this.validate(props.name)
    if (validatioResult.isLeft()) {
      return left(validatioResult.value)
    }

    return right(new UserName({name: validatioResult.value}))
  }
}
