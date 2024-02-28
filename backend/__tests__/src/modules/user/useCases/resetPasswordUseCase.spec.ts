import { UserMapper } from "../../../../../src/modules/user/mappers/userMapper";
import { UserRepoMongo } from "../../../../../src/modules/user/repo/UserMongoRepo";
import { TOKEN_TYPES, TokenPayload } from "../../../../../src/modules/user/services/IAuthService";
import { JWTAuth } from "../../../../../src/modules/user/services/JWTAuth";
import { CommonUseCaseResult } from "../../../../../src/shared/core/response/useCaseError";
import { Either, left, right } from "../../../../../src/shared/core/result";
import { createMockEntityUser, createMockPersistentUser } from "../mapper/userMapper.spec";
import { ResetPasswordUseCase } from "../../../../../src/modules/user/useCases/resetPassword/resetPasswordUseCase";
import {connect, clearDatabase, closeDatabase} from '../repo/db'
import { User } from "../../../../../src/modules/user/domain/user";

// Declare services and use cases
const authService = new JWTAuth("key")
const userRepo = new UserRepoMongo()
const resetPasswordUseCase = new ResetPasswordUseCase(authService, userRepo)

// Mock auth service to facilitate the tests
authService.decodeToken = jest.fn().mockImplementation((token: string):Either<CommonUseCaseResult.Unathorized, TokenPayload> => {
  const mockUser = createMockPersistentUser() 
  if (token === 'valid') {
    return right({
      id: mockUser._id,
      email: mockUser.email,
      tokenType: TOKEN_TYPES.CHANGE_PASSWORD
    })
  }

  if (token === 'authenticate') {
    return right({
      id: mockUser._id,
      email: mockUser.email,
      tokenType: TOKEN_TYPES.AUTHENTICATE
    })
  }
  return left(CommonUseCaseResult.Unathorized.create({
    errorMessage:'test',
    location: 'mock',
    variable: 'token'
    }))
})

describe("Reset password use case", () => { 

  beforeAll(async() => {
    await connect()
  })

  beforeEach(async () => {
    await userRepo.upsert(createMockEntityUser())
  })

  afterEach(async () => {
    clearDatabase()
  })

  afterAll(async () => {
    closeDatabase()
  })


  it("should sucessfully change a user password", async () => {
    // change password
    const response = await resetPasswordUseCase.execute({password: "654321", token: 'valid'})
    expect(response.isRight()).toBe(true) 

    //verify if password was saved
    const savedUser = (await userRepo.findById(createMockPersistentUser()._id)).value as User
    expect(await savedUser.password.compare('654321')).toBe(true)
  })

  it("should fail when passing an invalid password", async () => {
    // change password
    const response = await resetPasswordUseCase.execute({password: "123", token: 'valid'})
    expect(response.isLeft()).toBe(true) 
  })

  
  it("should fail with invalid token", async () => {
    // change password
    const response = await resetPasswordUseCase.execute({password: "654321", token: 'invalid'})
    expect(response.isLeft()).toBe(true) 
  })

  it("should fail with authentication token", async () => {
    // change password
    const response = await resetPasswordUseCase.execute({password: "654321", token: 'authenticate'})
    expect(response.isLeft()).toBe(true) 
  })
})
