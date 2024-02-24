import { UserName, UserNameProps } from "../../../../../../src/modules/user/domain/userProps/userName";

describe("User name value object", () => {

  test("It should fail to be created on invalid data", () => {
    expect(UserName.create({name: null} as unknown as UserNameProps).isLeft()).toBe(true)
    expect(UserName.create({name: undefined} as unknown as UserNameProps).isLeft()).toBe(true)
    expect(UserName.create({name: ''} as unknown as UserNameProps).isLeft()).toBe(true)
    expect(UserName.create({name: {}} as unknown as UserNameProps).isLeft()).toBe(true)
    expect(UserName.create({name: () => {}} as unknown as UserNameProps).isLeft()).toBe(true)
    expect(UserName.create({name: []} as unknown as UserNameProps).isLeft()).toBe(true)
  })

   test("It should fail to be created on out of range names", () => {
    expect(UserName.create({name: "o"}).isLeft()).toBe(true)
    expect(UserName.create({name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}).isLeft()).toBe(true)
   })

  test("It should create on valid names", () => {
    expect(UserName.create({name: "José da silva junior"}).isRight()).toBe(true)
    expect(UserName.create({name: "José"}).isRight()).toBe(true)
  })

  test("It should trim created text", () => {
    expect((UserName.create({name: " José da silva junior   "}).value as UserName).value).toBe("José da silva junior")
  })
})
