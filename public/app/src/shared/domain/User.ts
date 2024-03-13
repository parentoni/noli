export type UserProps = {
  _id: string,
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
  _id: string
  email: string
  password: string
  name: string
  role: number
  

  constructor(props: UserProps) {
    this._id = props._id
    this.email = props.email
    this.password = props.password
    this.name = props.name
    this.role = props.role
  }
}
