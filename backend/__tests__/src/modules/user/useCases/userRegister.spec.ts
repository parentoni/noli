import { connect, closeDatabase, clearDatabase } from "../repo/db";
import { UserRegisterUseCase } from "../../../../../src/modules/user/useCases/userRegister/userRegisterUseCase";
import { authService } from "../service/JWTAuthService.spec";
import { userRepo } from "../repo/UserRepoMongo.spec";

export const mockedUserRegisterUseCase = new UserRegisterUseCase(userRepo,authService)

describe("User register use case", () => {

  beforeAll(async () => {
    await connect()
  })

  afterEach(async () => {
    await clearDatabase()
  })

  afterAll(async () => {
    await closeDatabase()
  })

  it("Should register a new user", async () => {
    const user = {
      email: 'apg@gmail.com',
      password: '123456',
      name: 'Arthur'
    }

    const result = await mockedUserRegisterUseCase.execute(user)
    expect(result.isRight()).toBe(true)

    const userExists = await userRepo.findByEmail(user.email)
    expect(userExists.isRight()).toBe(true)
    expect(userExists.getRight()?.email.value).toBe(user.email)
  })

  it("Should return an error when trying to register a user with invalid data", async () => {
    const user = {
      email: 'apg',
      password: '1234',
      name:''
    }
    
    const result = await mockedUserRegisterUseCase.execute(user)
    expect(result.isLeft()).toBe(true)
  })

  it("Should return an error when trying to register a user that already exists", async () => {
    const user = {
      email: 'apg@gmail.com',
      password: '123456',
      name: 'Arthur'
    }

    const insertResult = await mockedUserRegisterUseCase.execute(user)
    expect(insertResult.isRight()).toBe(true)
    
    const result = await mockedUserRegisterUseCase.execute(user)
    expect(result.isLeft()).toBe(true)
  })
})
