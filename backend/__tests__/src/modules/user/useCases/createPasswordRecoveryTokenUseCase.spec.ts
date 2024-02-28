import { UserRepoMongo } from "../../../../../src/modules/user/repo/UserMongoRepo";
import { right } from "../../../../../src/shared/core/result";
import { createMockEntityUser } from "../mapper/userMapper.spec";
import { CreatePasswordRecoveryTokenUseCase } from '../../../../../src/modules/user/useCases/createPasswordRecoverytoken/createPasswordRecoveryTokenUseCase'
import { authService } from "../service/JWTAuthService.spec";
import { CommonUseCaseResult } from "../../../../../src/shared/core/response/useCaseError";

const userRepo = new UserRepoMongo()
const createPasswordRecoveryTokenUseCase = new CreatePasswordRecoveryTokenUseCase(authService, userRepo) 

userRepo.findByEmail = jest.fn().mockImplementation(async (email:string) => {
  
  if (email === 'apg@gmail.com') {
    return right(createMockEntityUser())
  }

  return right(null)
})

describe("Create password recovery use case", () => {

  it("Should sucessfuly create a password recovery token with valid input", async () => {
    const response = await createPasswordRecoveryTokenUseCase.execute({email: 'apg@gmail.com'})
    expect(response.isRight()).toBe(true)
  })

  it("Should return left when email is not found", async () => {
    const response = await createPasswordRecoveryTokenUseCase.execute({email: 'aaaaa@gmail.com'})
    expect(response.value).toBeInstanceOf(CommonUseCaseResult.InvalidValue)
  })

  it("Should return left when email is invalid", async () => {
    const response = await createPasswordRecoveryTokenUseCase.execute({email: 'aaa'})
    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(CommonUseCaseResult.InvalidValue)
  })
})
