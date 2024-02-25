import { Guard } from "../../../../shared/core/Guard"
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError"
import { Either, left, right } from "../../../../shared/core/result"
import { ValueObject } from "../../../../shared/domain/ValueObject"
import { hash, compare } from "bcrypt"

/**
 * User password required props 
 */
export type UserPasswordProps = {
  password: string,
  hashed: boolean
}

/**
 * 
 * @class UserPassword
 * @classdesc User password value object. Should handle validation and hashing. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class UserPassword extends ValueObject<UserPasswordProps> {

  //Minimum password length
  static MIN_LENGTH = 6

  //Salting rounds
  static SALT_ROUNDS = 10

  get value(): string {
    return this.props.password
  }

  get hashed(): boolean {
    return this.props.hashed
  }
  
  /**
   * Return hashed password
   * @param {string} password 
   * @returns {string}
   */
  private static async hashPassword(password:string): Promise<string> {
    return await hash(password, this.SALT_ROUNDS) 
  }

  /**
   * Validates password
   * @param {string} password 
   */
  private static validate(password:string): Either<CommonUseCaseResult.InvalidValue, null> {

    //Check password length
    const guardRange = Guard.inRange(password?.length || -1, this.MIN_LENGTH, Infinity, "PASSWORD_LENGTH")
    if (guardRange.isLeft()) {
      return left(guardRange.value)
    }

    //Return right null if validation was successful
    return right(null)
  }

  /**
   * Creates validated password.
   * @param {UserPasswordProps} props 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
  */
  public static create(props: UserPasswordProps): Either<CommonUseCaseResult.InvalidValue, UserPassword> {

    //Validate input 
    const validationResult = this.validate(props.password)
    if (validationResult.isLeft()) {
      return left(validationResult.value)
    }
    
    //return right with new UserPassword
    return right(new UserPassword(props))
  }

  /**
   * Get hashed password
   * @returns {Promise<UserPassword>} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public async getHashed(): Promise<UserPassword> {
    if (!this.hashed) {
      return new UserPassword({ password: await UserPassword.hashPassword(this.props.password), hashed: true })
    }

    return this
  }

  /**
   * Compare password
   * @param {string} plainText 
   * @returns {Promise<boolean>}
   */
  public async compare(plainText: string): Promise<boolean> {
    //If hashed compare hashed password
    if (this.hashed) {
      return await compare(plainText, this.props.password)
    }

    //If not hashed compare plain text
    return plainText === this.props.password
  }
  
}
