import { connect, clearDatabase, closeDatabase} from './db'
import { createMockEntityUser } from '../mapper/userMapper.spec';
import { UserModel } from '../../../../../src/shared/infra/database/models/User';
import { UserMapper } from '../../../../../src/modules/user/mappers/userMapper';
import { UserRepoMongo } from '../../../../../src/modules/user/repo/UserMongoRepo';
export const userRepo = new UserRepoMongo()

describe("Mongo implementation of user repo", () => {


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

  describe("User upsert", () => {
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
  })
  
  describe("User find by email", () => {
    
    it("should return an user when email is found", async () => {
      const user = createMockEntityUser()
      const insertResult = await userRepo.upsert(user)
      expect(insertResult.isRight()).toBe(true)

      const result = await userRepo.findByEmail(user.email.value)
      expect(result.isRight()).toBe(true)
      if (result.isRight() && result.value !== null) {
        expect(result.value.id.toValue()).toBe(user.id.toValue())
      }
    })

    it("should return null when email is not found", async () => {
      const result = await userRepo.findByEmail('notfoundemail')
      expect(result.isRight()).toBe(true)
      expect(result.value).toBeNull()
    })

    it("should return an error when trying to find a user with invalid data", async () => {
      const result = await userRepo.findByEmail([{},{}] as unknown as string)
      expect(result.isLeft()).toBe(true)
    })
  })

  describe("User find by id", () => {

    it("should return an user when id is found", async () => {
      const user = createMockEntityUser()
      const insertResult = await userRepo.upsert(user)
      expect(insertResult.isRight()).toBe(true)

      const result = await userRepo.findById(user.id.toValue())
      expect(result.isRight()).toBe(true)
      if (result.isRight() && result.value !== null) {
        expect(result.value.id.toValue()).toBe(user.id.toValue())
      }
    })

    it("should return null when id is not found", async () => {
      const result = await userRepo.findById('65dba0ba5a6764099ad10781')
      expect(result.isRight()).toBe(true)
      expect(result.value).toBeNull()
    })

    it("should return an error when trying to find a user with invalid data", async () => {
      const result = await userRepo.findById('invalidid')
      expect(result.isLeft()).toBe(true)
    })
  })

});
