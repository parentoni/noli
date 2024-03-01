import { ItemDescription, ItemDescriptionProps } from "../../../../../../src/modules/item/domain/itemProps/itemDescription"

describe("Store name value object", () => {
    test("It should fail when provided with null names", () => {
        expect(ItemDescription.create({description: null} as unknown as ItemDescriptionProps).isLeft()).toBe(true)
        expect(ItemDescription.create({description: undefined} as unknown as ItemDescriptionProps).isLeft()).toBe(true)
        expect(ItemDescription.create({description: ''} as unknown as ItemDescriptionProps).isLeft()).toBe(true)
      })

  test("It should fail when provided with non string names", () => {
    expect(ItemDescription.create({description: () => {}} as unknown as ItemDescriptionProps).isLeft()).toBe(true)
    expect(ItemDescription.create({description: {}} as unknown as ItemDescriptionProps).isLeft()).toBe(true)
    expect(ItemDescription.create({description: []} as unknown as ItemDescriptionProps).isLeft()).toBe(true)
    expect(ItemDescription.create({description: 42} as unknown as ItemDescriptionProps).isLeft()).toBe(true)
  })

  test("It should be created with valid names", () => {
    expect(ItemDescription.create({description: "asdasdasdasda"}).isRight()).toBe(true)
    expect(ItemDescription.create({description: "hkjsdfkjhaskfhkshf.kskjkjsdfsd"}).isRight()).toBe(true)
    expect(ItemDescription.create({description: "asdasdasdasdssadasd"} as unknown as ItemDescriptionProps).isRight()).toBe(true)
  })

  test("After creation, it should get the name value correctly", () => {
    expect((ItemDescription.create({description: "Henrique"}).value as ItemDescription).value).toBe("Henrique")
    expect((ItemDescription.create({description: "Henrique Kitaya.10   "}).value as ItemDescription).value).toBe("Henrique Kitaya.10")
  })
})