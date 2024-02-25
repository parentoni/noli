import { connect, clearDatabase, closeDatabase} from './db'
import { createMockEntityUser } from '../mapper/userMapper.spec';
import { userRepo } from '../../../../../src/modules/user/repo';
import { UserModel } from '../../../../../src/shared/infra/database/models/User';
import { UserMapper } from '../../../../../src/modules/user/mappers/userMapper';

describe("Mongo implementation of UserRepo", () => {

  // Connect to a new in-memory database before running any tests.
  beforeAll(async () => {
    await connect()
  })

  // Clear all test data after every test.
  afterEach(async () => {
    await clearDatabase()
  })

  // Remove and close the db and server.
  afterAll(async () => {
    await closeDatabase()
  })


  it("should successfully create a new user", async () => {
    const user = createMockEntityUser() 
    
    const result = await userRepo.upsert(user)
    expect(result.isRight()).toBe(true)
    expect(await UserModel.findOne({ _id: user.id.toValue() })).toBeTruthy()
  });

  it("should update an user", async () => {
    //Create a new user
    const user = createMockEntityUser()
    const insertResult = await userRepo.upsert(user)
    expect(insertResult.isRight()).toBe(true) 

    //Update the user
    const updatePersistentUser = (await UserMapper.toPersistent(user))
    updatePersistentUser.name = 'John Doe TZT'
    const updatedEntityUser = UserMapper.toDomain(updatePersistentUser).getRight()
    const updateResult = await userRepo.upsert(updatedEntityUser)
    expect(updateResult.isRight()).toBe(true)

    //Check if the user was updated
    const updatedUser = await UserModel.findOne({ _id: user.id.toValue() })
    expect(updatedUser?.name).toBe("John Doe TZT")
  })

  it("should return an error when trying to create a user with invalid data", async () => {
    //Create a new valid user
    const user = createMockEntityUser()
    
    // Invalidate user
    const invalidPersistenUser = await UserMapper.toPersistent(user) 
    invalidPersistenUser.email = 'invalidemail'
    const invalidUser = UserMapper.toDomain(invalidPersistenUser).getRight()
  
    // Try to upsert
    const result = await userRepo.upsert(invalidUser)
    expect(result.isLeft()).toBe(true)
  })

});
