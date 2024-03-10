export type UserProps = {
  email: string,
  password: string,
  name: string,
  role: number 
}

/**
 * 
 * @class User
 * @classdesc User class.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class User {
  constructor(public email: string, public password: string, public name: string, public role: number) {
    this.email = email
    this.password = password
    this.name = name
    this.role = role
  }
}
