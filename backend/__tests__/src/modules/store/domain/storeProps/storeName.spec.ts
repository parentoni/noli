import { StoreName, StoreNameProps } from "../../../../../../src/modules/store/domain/storeProps/storeName"

describe("Store name value object", () => {
    test("It should fail when provided with null names", () => {
        expect(StoreName.create({name: null} as unknown as StoreNameProps).isLeft()).toBe(true)
        expect(StoreName.create({name: undefined} as unknown as StoreNameProps).isLeft()).toBe(true)
        expect(StoreName.create({name: ''} as unknown as StoreNameProps).isLeft()).toBe(true)
      })

  test("It should fail when provided with non string names", () => {
    expect(StoreName.create({name: () => {}} as unknown as StoreNameProps).isLeft()).toBe(true)
    expect(StoreName.create({name: {}} as unknown as StoreNameProps).isLeft()).toBe(true)
    expect(StoreName.create({name: []} as unknown as StoreNameProps).isLeft()).toBe(true)
    expect(StoreName.create({name: 42} as unknown as StoreNameProps).isLeft()).toBe(true)
  })

  test("It should be created with valid names", () => {
    expect(StoreName.create({name: "asdasdasdasda"}).isRight()).toBe(true)
    expect(StoreName.create({name: "hkjsdfkjhaskfhkshf.kskjkjsdfsd"}).isRight()).toBe(true)
    expect(StoreName.create({name: "asdasdasdasdssadasd"} as unknown as StoreNameProps).isRight()).toBe(true)
  })

  test("After creation, it should get the name value correctly", () => {
    expect((StoreName.create({name: "Henrique"}).value as StoreName).value).toBe("Henrique")
    expect((StoreName.create({name: "Henrique Kitaya.10   "}).value as StoreName).value).toBe("Henrique Kitaya.10")
  })
})