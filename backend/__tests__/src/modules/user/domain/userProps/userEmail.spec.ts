import { UserEmail, UserEmailProps } from "../../../../../../src/modules/user/domain/userProps/userEmail"
describe("User email value object", () => {

  test("It should fail when provided with null emails", () => {
    expect(UserEmail.create({email: null} as unknown as UserEmailProps).isLeft()).toBe(true)
    expect(UserEmail.create({email: undefined} as unknown as UserEmailProps).isLeft()).toBe(true)
    expect(UserEmail.create({email: ''} as unknown as UserEmailProps).isLeft()).toBe(true)
  })

  test("It should fail when provided with non string emails", () => {
    expect(UserEmail.create({email: () => {}} as unknown as UserEmailProps).isLeft()).toBe(true)
    expect(UserEmail.create({email: {}} as unknown as UserEmailProps).isLeft()).toBe(true)
    expect(UserEmail.create({email: []} as unknown as UserEmailProps).isLeft()).toBe(true)
    expect(UserEmail.create({email: 42} as unknown as UserEmailProps).isLeft()).toBe(true)
  })

  test("It should fail when provided with invalid emails", () => {
    expect(UserEmail.create({email: "apg"} as unknown as UserEmailProps).isLeft()).toBe(true)
    expect(UserEmail.create({email: "apg.gmail.com"} as unknown as UserEmailProps).isLeft()).toBe(true)
    expect(UserEmail.create({email: "apg@gmail"} as unknown as UserEmailProps).isLeft()).toBe(true)
  })

  test("It should be created with valid emails", () => {
    expect(UserEmail.create({email: "apg@gmail.com"}).isRight()).toBe(true)
    expect(UserEmail.create({email: "sdfghj@42.com"}).isRight()).toBe(true)
    expect(UserEmail.create({email: "super-long-email-name@gmail.com.br"}).isRight()).toBe(true)
    expect(UserEmail.create({email: "apg@ gmail. com"} as unknown as UserEmailProps).isRight()).toBe(true)
  })

  test("After creation, it should get the email value correctly", () => {
    expect((UserEmail.create({email: "apg@gmail.com"}).value as UserEmail).value).toBe("apg@gmail.com")
    expect((UserEmail.create({email: "a pg@g mail .com"}).value as UserEmail).value).toBe("apg@gmail.com")
  })
})
