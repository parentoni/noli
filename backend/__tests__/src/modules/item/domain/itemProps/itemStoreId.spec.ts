import { ItemStore, ItemStoreProps } from "../../../../../../src/modules/item/domain/itemProps/itemStoreId"
import { UniqueGlobalId } from "../../../../../../src/shared/domain/UniqueGlobalD"

describe("Item storeId value object", () => {
    test("It should fail when provided with null ids", () => {
        expect(ItemStore.create({storeId: null} as unknown as ItemStoreProps).isLeft()).toBe(true)
        expect(ItemStore.create({storeId: undefined} as unknown as ItemStoreProps).isLeft()).toBe(true)
        expect(ItemStore.create({storeId: ''} as unknown as ItemStoreProps).isLeft()).toBe(true)
      })

  test("It should fail when provided with invalid ids", () => {
    expect(ItemStore.create({storeId: () => {}} as unknown as ItemStoreProps).isLeft()).toBe(true)
    expect(ItemStore.create({storeId: {}} as unknown as ItemStoreProps).isLeft()).toBe(true)
    expect(ItemStore.create({storeId: []} as unknown as ItemStoreProps).isLeft()).toBe(true)
    expect(ItemStore.create({storeId: 42} as unknown as ItemStoreProps).isLeft()).toBe(true)
    expect(ItemStore.create({storeId: "537eed02ed345b2e039652d2"} as unknown as ItemStoreProps).isLeft()).toBe(true)
  })

  test("It should be created with valid names", () => {
    expect(ItemStore.create({storeId: new UniqueGlobalId()}).isRight()).toBe(true)
    // expect(ItemStore.create({storeId: "hkjsdfkjhaskfhkshf.kskjkjsdfsd"}).isRight()).toBe(true)
    // expect(ItemStore.create({storeId: "asdasdasdasdssadasd"} as unknown as ItemStoreProps).isRight()).toBe(true)
  })

  test("After creation, it should get the storeId value correctly", () => {
    const id = new UniqueGlobalId()
    expect((ItemStore.create({storeId: id}).value as ItemStore).value).toBe(id)
    // expect((ItemStore.create({storeId: "Henrique Kitaya.10   "}).value as ItemStoreId).value).toBe("Henrique Kitaya.10")
  })
})