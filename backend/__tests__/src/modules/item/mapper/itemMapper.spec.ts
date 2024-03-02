import { Item } from '../../../../../src/modules/item/domain/item';
import { ItemName } from '../../../../../src/modules/item/domain/itemProps/itemName';
import { ItemImage } from '../../../../../src/modules/item/domain/itemProps/itemImage';
import { ItemPrice } from '../../../../../src/modules/item/domain/itemProps/itemPrice';
import { ItemDescription } from '../../../../../src/modules/item/domain/itemProps/itemDescription';
import { ItemStore } from '../../../../../src/modules/item/domain/itemProps/itemStoreId';
import { UniqueGlobalId } from '../../../../../src/shared/domain/UniqueGlobalD';
import {ItemMap} from '../../../../../src/modules/item/mappers/itemMapper';
import { IItem } from '../../../../../src/shared/infra/database/models/Item';

export const createMockEntityItem = () => {
  const name = ItemName.create({name: 'Strogonoff'}).getRight()
  const image = ItemImage.create({image: 'https://s2-receitas.glbimg.com/9WejV7JkgYxS1dqzDt1MoupQg_0=/0x0:1024x576/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2023/q/P/BOoA4STbAP9EGefsySgQ/strogonoff-de-frango-receita-facil-e-deliciosa-2-.jpg'}).getRight()
  const price = ItemPrice.create({price: 23}).getRight()
  const description = ItemDescription.create({description: "Prato de strogonoff"}).getRight()
  const storeId = ItemStore.create({storeId: new UniqueGlobalId("537eed02ed345b2e039652d2")}).getRight()


  return Item.create({name, image, price, description, storeId}, undefined).getRight()
}

export const createMockPersistentItem = () => {
  return {
    _id: '537eed02ed345b2e039652d2',
    name: 'henrique',
    image: 'https://s2-receitas.glbimg.com/9WejV7JkgYxS1dqzDt1MoupQg_0=/0x0:1024x576/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2023/q/P/BOoA4STbAP9EGefsySgQ/strogonoff-de-frango-receita-facil-e-deliciosa-2-.jpg', // 123456,
    price: 32,
    description : "HAHAHAH",
    storeId :"537eed02ed345b2e039652d2"
  }
}

describe('Item Mapper', () => {

  it('Should map a entity item to a persistent item', async () => {
    const user = createMockEntityItem()
    const persistentItem = ItemMap.toPersistent(user).getRight()
  
    expect(persistentItem.image).toBe(user.props.image.value)
    expect(persistentItem.name).toBe(user.props.name.value)
    expect(persistentItem._id).toBe(user.id.toValue())
    expect(persistentItem.price).toBe(user.props.price.value)
    expect(persistentItem.description).toBe(user.props.description.value)
    expect(persistentItem.storeId).toBe(user.props.storeId.value.toValue())
  })
 
  it('Should map a persistent item to a entity item', () => {
    const persistentItem = createMockPersistentItem()
    const entityItem = ItemMap.toDomain(persistentItem).getRight()

    expect(entityItem.props.image.value).toBe(persistentItem.image)
    expect(entityItem.props.name.value).toBe(persistentItem.name)
    expect(entityItem.id.toValue()).toBe("537eed02ed345b2e039652d2")
    expect(entityItem.props.price.value).toBe(persistentItem.price)
    expect(entityItem.props.description.value).toBe(persistentItem.description)
    expect(entityItem.props.storeId.value.toValue()).toBe(persistentItem.storeId)
  })

  it('Should return an error when trying to map a persistent user to a entity user with invalid data', () => {
    const persistentItem = {
      _id: '123',
      name: ' ',
      description: '32',
      image: "asdasd",
      price : 23,
      storeId : "asd"
    }
    const entityItem = ItemMap.toDomain(persistentItem)
    expect(entityItem.isLeft()).toBe(true)
    
  })
  
//   it('Should map a list of persistent users to a list of entity users', () => {
//     const persistentItems = [createMockpersistentItem(), createMockpersistentItem()]
//     const firstentityItem = UserMapper.toDomain(createMockpersistentItem()).getRight()
    
//     const entityItems = UserMapper.toDomainBulk(persistentItems)
    
//     if (entityItems[0]) {
//       expect(entityItems[0]).toStrictEqual(firstentityItem)

//     }
//     expect(entityItems.length).toBe(2)
//   })

//   it("Should map a list of entity users to a list of persistent users", async () => {
//     const entityItems = [createMockentityItem(), createMockentityItem()]
//     const persistentItems = await UserMapper.toPersistentBulk(entityItems)

//     if (persistentItems[0] && entityItems[0]) {
//       expect(persistentItems[0].password.length).toBeGreaterThan(10) //Password should be hashed
//       expect(persistentItems[0].email).toBe(entityItems[0].email.value) // Email should be the same
//       expect(persistentItems[0].name).toBe(entityItems[0].name.value) // Name should be the same
//       expect(persistentItems[0]._id).toBe(entityItems[0].id.toValue()) // Id should be the same
//     }

//     expect(persistentItems.length).toBe(2) // Should have 2 users
//   })
  
//   it("Should return an empty array when trying to map an invalid list of persistentItems to entityItems", async () => {
    
//     const invalidpersistentItem = {
//       _id: '123',
//       email: 'sfsdfa',
//       password: '123456',
//       name: 'Arthur',
//     }
//     const entityItems = UserMapper.toDomainBulk([invalidpersistentItem, invalidpersistentItem])
//     expect(entityItems).toEqual([])
//   })


})
