import { UserPassword, UserPasswordProps } from "../../../../../../src/modules/user/domain/userProps/userPassword";

describe('UserPassword value object', () => {
  
  test("It should fail to create a password with less than 6 characters", () => {
    expect(UserPassword.create({password: "12345", hashed: false}).isLeft()).toBeTruthy()
  })

  test("It should create a valid password", () => {
    expect(UserPassword.create({password: "123456", hashed: false}).isRight()).toBeTruthy()
    expect(UserPassword.create({password: "      ", hashed: false}).isRight()).toBeTruthy()
  })

  test("It should fail to create a password with invalid data", () => {
    expect(UserPassword.create({password: null, hashed: false} as unknown as UserPasswordProps).isLeft()).toBeTruthy()
    expect(UserPassword.create({password: undefined, hashed: false} as unknown as UserPasswordProps).isLeft()).toBeTruthy()
    expect(UserPassword.create({password: () => {}, hashed: false} as unknown as UserPasswordProps).isLeft()).toBeTruthy()
    expect(UserPassword.create({password: {}, hashed: false} as unknown as UserPasswordProps).isLeft()).toBeTruthy()
    expect(UserPassword.create({password: 0, hashed: false} as unknown as UserPasswordProps).isLeft()).toBeTruthy()
  })

  test("It should hash a password", async () => {
    const plainTextPassword = UserPassword.create({password: "123456", hashed: false}).value as UserPassword
    const hashedPassword = await plainTextPassword.getHashed()

    expect(hashedPassword.value).not.toBe(plainTextPassword.value)
    expect(await hashedPassword.getHashed()).toBe(hashedPassword)
  })

  test("It should compare a password", async () => {
    const password = '123456'
    const plainTextPassword = UserPassword.create({password, hashed: false}).value as UserPassword

    const hashedPassword = await plainTextPassword.getHashed()

    expect(await hashedPassword.compare(password)).toBeTruthy()
    expect(await hashedPassword.compare('12345')).toBeFalsy()

    expect(await plainTextPassword.compare(password)).toBeTruthy()
    expect(await plainTextPassword.compare('12345')).toBeFalsy()
  })
  
})
