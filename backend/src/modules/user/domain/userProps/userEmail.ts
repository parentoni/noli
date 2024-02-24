import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { TextUtils } from "../../../../shared/utils/TextUtils";

/**
 * User email required props 
 */
export type UserEmailProps = {
  email: string
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.email;
  }
  
  /**
   * Apply validation logic to email. Follows basic regex checking
   * */ 
  private static isValid(email: string): boolean {
    const re = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return re.test(email);
  }

  /**
   * Creates user email with validation and text sanitization
   *
   * @param {UserEmailProps} props 
   * @returns {Either<CommonUseCaseResult.InvalidValue, UserEmail>} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public static create(props: UserEmailProps): Either<CommonUseCaseResult.InvalidValue, UserEmail> {

    //sanitize email
    const sanitizedEmail = TextUtils.sanitize(props.email)

    console.log(sanitizedEmail)
    // Check if value is null
    const propsResult = Guard.againstNullOrUndefined(sanitizedEmail, "email");
    if (propsResult.isLeft()) {
      return left(propsResult.value)
    }

    // Domain specific validation
    const valid = this.isValid(sanitizedEmail);
    if (!valid) {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          errorMessage: `Invalid email ${sanitizedEmail}`,
          location: `${UserEmail.name}.${UserEmail.create.name}`,
          variable: "EMAIL"
        })
      );
    }
    
    // Return new user email on success
    return right(new UserEmail({ email: sanitizedEmail }));

  }
}
