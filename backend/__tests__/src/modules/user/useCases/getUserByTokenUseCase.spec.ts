import { UserMapper } from "../../../../../src/modules/user/mappers/userMapper";
import { UserRepoMongo } from "../../../../../src/modules/user/repo/UserMongoRepo";
import { CommonUseCaseResult } from "../../../../../src/shared/core/response/useCaseError";
import { left, right } from "../../../../../src/shared/core/result";
import { createMockEntityUser, createMockPersistentUser } from "../mapper/userMapper.spec";
import { authService } from "../service/JWTAuthService.spec";
import { GetUserByTokenUseCase } from "../../../../../src/modules/user/useCases/getUserByToken/getUserByTokenUseCase";

const userRepo = new UserRepoMongo();

// Mock find user by id in user repo
userRepo.findById = jest.fn().mockImplementation(async (id: string) => {
  if (id === 'invalid') {
    return right(null) 
  } 

  if (id === 'error') {
    return left(CommonUseCaseResult.UnexpectedError.create('error'))
  }

  return right(createMockEntityUser())
});


const getUserByTokenUseCase = new GetUserByTokenUseCase(authService, userRepo);
describe("Find user by token", () => {
  it("Should decrypt token and return user", async () => {
    const user = await UserMapper.toPersistent(createMockEntityUser())
    const token = authService.signToken({id: user._id, email: user.email})

    const userByToken = await getUserByTokenUseCase.execute({token: token})
    expect(userByToken.isRight()).toBeTruthy()

    if (userByToken.isLeft()) {
      return
    }

    expect(userByToken.value._id).toBe(user._id)
    expect(userByToken.value.name).toBe(user.name)
  })

  it("Should return Invalid error when user is not found", async () => {
    const token = authService.signToken({id: 'invalid', email: 'invalid@invalid.com'})
    const userByToken = await getUserByTokenUseCase.execute({token: token})

    expect(userByToken.isLeft()).toBeTruthy()
    expect(userByToken.value).toBeInstanceOf(CommonUseCaseResult.InvalidValue)
  })

  it("Should return UnexpectedError when an error occurs", async () => {
    const token = authService.signToken({id: 'error', email: 'error@error.com'})
    const userByToken = await getUserByTokenUseCase.execute({token: token})

    expect(userByToken.isLeft()).toBeTruthy()
    expect(userByToken.value).toBeInstanceOf(CommonUseCaseResult.UnexpectedError)
  })

  it('Should return Unauthorized when token is invalid', async () => {
    const userByToken = await getUserByTokenUseCase.execute({token: 'invalid'})
    
    expect(userByToken.isLeft()).toBeTruthy()
    expect(userByToken.value).toBeInstanceOf(CommonUseCaseResult.Unathorized)
 })
})
