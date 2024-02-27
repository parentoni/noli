import { User} from "../../../../../src/modules/user/domain/user"
import { UserEmail } from "../../../../../src/modules/user/domain/userProps/userEmail"
import { UserName } from "../../../../../src/modules/user/domain/userProps/userName"
import { UserPassword } from "../../../../../src/modules/user/domain/userProps/userPassword"
import { USER_ROLES, UserRole } from "../../../../../src/modules/user/domain/userProps/userRole"
describe('User aggregate root', () => {
  
  test("It should create a valid user", () => {
    const email = UserEmail.create({email: "apg@gmail.com"}).value as UserEmail
    const password = UserPassword.create({password: "123456", hashed: false}).value as UserPassword
    const name = UserName.create({name: "Arthur"}).value as UserName
    const role = UserRole.create({role: USER_ROLES.USER }).getRight()

    const user = User.create({email, password, name, role}).value as User
    expect(user).toBeInstanceOf(User)
  })

  test("It should fail to create a user with invalid data", () => {
    const user = User.create({email: null, password: null, name: null} as unknown as User)
    expect(user.isLeft()).toBeTruthy()
  })

  test("It should get user email", () => {
    const email = UserEmail.create({email: "apg@gmail.com"}).value as UserEmail
    const password = UserPassword.create({password: "123456", hashed: false}).value as UserPassword
    const name = UserName.create({name: "Arthur"}).value as UserName
    const role = UserRole.create({role: USER_ROLES.USER }).getRight()

    const user = User.create({email, password, name,role}).value as User
    expect(user.email).toBe(email)
  })

  test("It should get user password", () => {
    const email = UserEmail.create({email: "apg@gmail.com"}).value as UserEmail
    const password = UserPassword.create({password: "123456", hashed: false}).value as UserPassword
    const name = UserName.create({name: "Arthur"}).value as UserName
    const role = UserRole.create({role: USER_ROLES.USER }).getRight()

    const user = User.create({email, password, name, role}).value as User
    expect(user.password).toBe(password)
  })

  test("It should get user name", () => {
    const email = UserEmail.create({email: "apg@gmail.com"}).value as UserEmail
    const password = UserPassword.create({password: "123456", hashed: false}).value as UserPassword
    const name = UserName.create({name: "Arthur"}).value as UserName
    const role = UserRole.create({role: USER_ROLES.USER }).getRight()

    const user = User.create({email, password, name, role}).value as User
    expect(user.name).toBe(name)
  })

  
  test("It should get user role", () => {
    const email = UserEmail.create({email: "apg@gmail.com"}).value as UserEmail
    const password = UserPassword.create({password: "123456", hashed: false}).value as UserPassword
    const name = UserName.create({name: "Arthur"}).value as UserName
    const role = UserRole.create({role: USER_ROLES.USER }).getRight()

    const user = User.create({email, password, name, role}).value as User
    expect(user.role).toBe(role)
  })
})
