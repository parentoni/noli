import { ItemName, ItemNameProps } from "../../../../../../src/modules/item/domain/itemProps/itemName"

describe("Store name value object", () => {
    test("It should fail when provided with null names", () => {
        expect(ItemName.create({name: null} as unknown as ItemNameProps).isLeft()).toBe(true)
        expect(ItemName.create({name: undefined} as unknown as ItemNameProps).isLeft()).toBe(true)
        expect(ItemName.create({name: ''} as unknown as ItemNameProps).isLeft()).toBe(true)
      })

  test("It should fail when provided with non string names", () => {
    expect(ItemName.create({name: () => {}} as unknown as ItemNameProps).isLeft()).toBe(true)
    expect(ItemName.create({name: {}} as unknown as ItemNameProps).isLeft()).toBe(true)
    expect(ItemName.create({name: []} as unknown as ItemNameProps).isLeft()).toBe(true)
    expect(ItemName.create({name: 42} as unknown as ItemNameProps).isLeft()).toBe(true)
  })

  test("It should be created with valid names", () => {
    expect(ItemName.create({name: "asdasdasdasda"}).isRight()).toBe(true)
    expect(ItemName.create({name: "hkjsdfkjhaskfhkshf.kskjkjsdfsd"}).isRight()).toBe(true)
    expect(ItemName.create({name: "asdasdasdasdssadasd"} as unknown as ItemNameProps).isRight()).toBe(true)
  })

  test("After creation, it should get the name value correctly", () => {
    expect((ItemName.create({name: "Henrique"}).value as ItemName).value).toBe("Henrique")
    expect((ItemName.create({name: "Henrique Kitaya.10   "}).value as ItemName).value).toBe("Henrique Kitaya.10")
  })
})