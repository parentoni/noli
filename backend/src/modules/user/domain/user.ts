import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

/**
 * Required params for initalizating and user aggregate root
 * */
export type UserProps = {

}

/**
 * 
 * @class User
 * @classdesc Aggregate root for user. Responsible for all user validation logic.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class User extends AggregateRoot<UserProps> {

}
