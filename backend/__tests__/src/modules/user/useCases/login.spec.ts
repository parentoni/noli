import { connect, closeDatabase, clearDatabase } from "../repo/db";
import { authService } from "../service/JWTAuthService.spec";
import { LoginUseCase } from '../../../../../src/modules/user/useCases/login/loginUseCase'
import { UserMapper } from "../../../../../src/modules/user/mappers/userMapper";
import { createMockPersistentUser } from "../mapper/userMapper.spec";
import { right } from "../../../../../src/shared/core/result";
import { UserRepoMongo } from "../../../../../src/modules/user/repo/UserMongoRepo";
import { CommonUseCaseResult } from "../../../../../src/shared/core/response/useCaseError";

const userRepo = new UserRepoMongo()

//Mock return of userRepo find by email
userRepo.findByEmail = jest.fn().mockImplementation(async (email: string) => {
  if (email === 'apg@gmail.com') {
    return right(UserMapper.toDomain(createMockPersistentUser()).getRight())
  }

  return right(null)
})

export const mockedLoginUseCase = new LoginUseCase(userRepo,authService)

describe("Login use case", () => {

  it("should successfully login a user", async () => {
    const result = await mockedLoginUseCase.execute({email: 'apg@gmail.com', password: "123456"})
    expect(result.isRight()).toBe(true)
  })

  it("should return forbidden when trying to login with invalid password", async () => {
    const result = await mockedLoginUseCase.execute({email: 'apg@gmail.com', password: "invalidpassword"})
    expect(result.value).toBeInstanceOf(CommonUseCaseResult.Forbidden)
  })

  it("should return not found when trying to login with invalid email", async () => {
    const result = await mockedLoginUseCase.execute({email: 'asdfghj@dfgh.com', password: "123456"})
    expect(result.value).toBeInstanceOf(CommonUseCaseResult.InvalidValue)
  })

  it("Should return an invalid error when trying to login with invalid data", async () => {
    const result = await mockedLoginUseCase.execute({email: 'invalidemail', password: "123456"})
    expect(result.value).toBeInstanceOf(CommonUseCaseResult.InvalidValue)
  })

})
