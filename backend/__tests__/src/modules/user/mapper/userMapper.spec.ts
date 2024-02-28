import { User } from '../../../../../src/modules/user/domain/user';
import { UserPassword } from '../../../../../src/modules/user/domain/userProps/userPassword';
import { UserEmail } from '../../../../../src/modules/user/domain/userProps/userEmail';
import { UserName } from '../../../../../src/modules/user/domain/userProps/userName';
import { UserMapper } from '../../../../../src/modules/user/mappers/userMapper';
import { UniqueGlobalId } from '../../../../../src/shared/domain/UniqueGlobalD';
import { USER_ROLES, UserRole } from '../../../../../src/modules/user/domain/userProps/userRole';

export const createMockEntityUser = () => {
  const email = UserEmail.create({email: 'apg@gmail.com'}).getRight()
  const password = UserPassword.create({password: '123456', hashed: false}).getRight()
  const name = UserName.create({ name: 'Arthur'}).getRight()
  const role = UserRole.create({ role: USER_ROLES.USER }).getRight()

  return User.create({email, password, name, role}, new UniqueGlobalId("65dcfb66285bdcd6ab649d58")).getRight()
}

export const createMockPersistentUser = () => {
  return {
    _id: '65dcfb66285bdcd6ab649d58',
    email: 'apg@gmail.com',
    password: '$2a$10$CgpO/0awGwCnCJCHUakmyOgdxw.Htik.vSyq8SHrmZgpvzPdWVblu', // 123456,
    name: 'Arthur',
    role: USER_ROLES.USER,
  }
}

describe('User Mapper', () => {

  it('Should map a entity user to a persistent user', async () => {
    const user = createMockEntityUser()
    const persistentUser = await UserMapper.toPersistent(user)
  
    const hashedPassword = UserPassword.create({password: persistentUser.password, hashed: true}).getRight()

    expect(await hashedPassword.compare(user.password.value)).toBe(true)
    expect(persistentUser.email).toBe(user.email.value)
    expect(persistentUser.name).toBe(user.name.value)
    expect(persistentUser._id).toBe(user.id.toValue())
  })
 
  it('Should map a persistent user to a entity user', () => {
    const persistentUser = createMockPersistentUser()
    const entityUser = UserMapper.toDomain(persistentUser).getRight()
  
    expect(entityUser.email.value).toBe(persistentUser.email)
    expect(entityUser.name.value).toBe(persistentUser.name)
    expect(entityUser.id.toValue()).toBe(persistentUser._id)
    expect(entityUser.password.value).toBe(persistentUser.password)
  })

  it('Should return an error when trying to map a persistent user to a entity user with invalid data', () => {
    const persistentUser = {
      _id: '123',
      email: 'sfsdfa',
      password: '123456',
      name: 'Arthur',
      role: USER_ROLES.USER
    } 
    const entityUser = UserMapper.toDomain(persistentUser)
    expect(entityUser.isLeft()).toBe(true)
    
  })
  
  it('Should map a list of persistent users to a list of entity users', () => {
    const persistentUsers = [createMockPersistentUser(), createMockPersistentUser()]
    const firstEntityUser = UserMapper.toDomain(createMockPersistentUser()).getRight()
    
    const entityUsers = UserMapper.toDomainBulk(persistentUsers)
    
    if (entityUsers[0]) {
      expect(entityUsers[0]).toStrictEqual(firstEntityUser)

    }
    expect(entityUsers.length).toBe(2)
  })

  it("Should map a list of entity users to a list of persistent users", async () => {
    const entityUsers = [createMockEntityUser(), createMockEntityUser()]
    const persistentUsers = await UserMapper.toPersistentBulk(entityUsers)

    if (persistentUsers[0] && entityUsers[0]) {
      expect(persistentUsers[0].password.length).toBeGreaterThan(10) //Password should be hashed
      expect(persistentUsers[0].email).toBe(entityUsers[0].email.value) // Email should be the same
      expect(persistentUsers[0].name).toBe(entityUsers[0].name.value) // Name should be the same
      expect(persistentUsers[0]._id).toBe(entityUsers[0].id.toValue()) // Id should be the same
    }

    expect(persistentUsers.length).toBe(2) // Should have 2 users
  })
  
  it("Should return an empty array when trying to map an invalid list of persistentUsers to entityUsers", async () => {
    
    const invalidPersistentUser = {
      _id: '123',
      email: 'sfsdfa',
      password: '123456',
      name: 'Arthur',
      role: USER_ROLES.USER
    }
    const entityUsers = UserMapper.toDomainBulk([invalidPersistentUser, invalidPersistentUser])
    expect(entityUsers).toEqual([])
  })


})
