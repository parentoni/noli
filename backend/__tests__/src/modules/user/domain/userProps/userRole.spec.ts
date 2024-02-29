import { USER_ROLES, UserRole } from '../../../../../../src/modules/user/domain/userProps/userRole'

describe("User role value object", () => {

  it("Should be created sucessfully with valid input", () => {
    const userRole = UserRole.create({role: USER_ROLES.USER})
    expect(userRole.isRight()).toBe(true)

    if (userRole.isLeft()) {
      return
    }

    expect(userRole.value.value).toBe(USER_ROLES.USER)
  })

  
  it("Should fail to be created with invalid input", () => {
    const userRole = UserRole.create({role: 777 as USER_ROLES})
    expect(userRole.isLeft()).toBe(true)
  })

  it("Should be created sucessfully with empty input", () => {
    const userRole = UserRole.create({role: undefined as unknown as USER_ROLES })
    expect(userRole.isLeft()).toBe(true)
  })
})
