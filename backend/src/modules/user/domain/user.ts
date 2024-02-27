import { Guard } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right} from "../../../shared/core/result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { UserEmail } from "./userProps/userEmail";
import { UserName } from "./userProps/userName";
import { UserPassword } from "./userProps/userPassword";
import { UserRole } from "./userProps/userRole";

/**
 * Required params for initalizating and user aggregate root
 * */
export type UserProps = {
  email: UserEmail,
  password: UserPassword,
  name: UserName,
  role: UserRole
}

/**
 * 
 * @class User
 * @classdesc Aggregate root for user. Responsible for all user validation logic.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class User extends AggregateRoot<UserProps> {
  
  get email(): UserEmail {
    return this.props.email
  }

  get password(): UserPassword {
    return this.props.password
  }

  get name(): UserName {
    return this.props.name
  }

  
  get role(): UserRole {
    return this.props.role
  }

  /**
   * Private constructor forces the use of the create method
   * @param {UserProps} props 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  private constructor(props: UserProps, id?: UniqueGlobalId | undefined) { 
    super(props, id)
  }
  
  /**
   * Create a new user
   * @param {UserProps} props 
   * @returns {User}
   */
  public static create(props: UserProps, id?: UniqueGlobalId | undefined): Either<CommonUseCaseResult.InvalidValue, User> {
   
    //Validate user props
    const guardResult =  Guard.againstNullOrUndefinedBulk([
      {argument: props.email, argumentName: 'email'},
      {argument: props.password, argumentName: 'password'},
      {argument: props.name, argumentName: 'name'},
      {argument: props.role, argumentName: "role"}
    ])

    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    // If successful, return right with a new user
    return right(new User(props, id)) 

  }
}
