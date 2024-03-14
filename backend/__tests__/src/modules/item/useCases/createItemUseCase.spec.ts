
import { createItemUseCase } from "../../../../../src/modules/item/useCases/createItemUseCase/index"
import { CreateItemUseCase } from "../../../../../src/modules/item/useCases/createItemUseCase/createItemUseCase"
import {connect, clearDatabase, closeDatabase} from "../../user/repo/db"
// import { itemRepo } from "../repo/itemRepoMongo.spec";

describe("item register use case", () => {

  beforeAll(async () => {
    await connect()
  })

  afterEach(async () => {
    await clearDatabase()
  })

  afterAll(async () => {
    await closeDatabase()
  })

  it("Should register a new item", async () => {
    const item = {
      name: 'NAME',
      image: 'https://s2-receitas.glbimg.com/9WejV7JkgYxS1dqzDt1MoupQg_0=/0x0:1024x576/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2023/q/P/BOoA4STbAP9EGefsySgQ/strogonoff-de-frango-receita-facil-e-deliciosa-2-.jpg',
      price: 32,
      description : "ASDSD",
      storeId: "537eed02ed345b2e039652d2"
    }

    const result = await new CreateItemUseCase().execute(item)
    expect(result.isRight()).toBe(true)

  })

  // it("Should return an error when trying to register an item with invalid data", async () => {
  //   const item = {
  //     name: 'NAME',
  //     image: 'https://s2-receitas.glbimg.com/9WejV7JkgYxS1dqzDt1MoupQg_0=/0x0:1024x576/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2023/q/P/BOoA4STbAP9EGefsySgQ/strogonoff-de-frango-receita-facil-e-deliciosa-2-.jpg',
  //     price: 32,
  //     description : "ASDSD",
  //     storeId: ""
  //   }
    
  //   const result = await new CreateItemUseCase().execute(item)
  //   expect(result.isLeft()).toBe(true)
  // })

  // it("Should return an error when trying to register a item that already exists", async () => {
  //   const item = {
  //     email: 'apg@gmail.com',
  //     password: '123456',
  //     name: 'Arthur'
  //   }

  //   const insertResult = await mockeditemRegisterUseCase.execute(item)
  //   expect(insertResult.isRight()).toBe(true)
    
  //   const result = await mockeditemRegisterUseCase.execute(item)
  //   expect(result.isLeft()).toBe(true)
  // })
})
