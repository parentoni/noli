import { ItemPrice, ItemPriceProps } from "../../../../../../src/modules/item/domain/itemProps/itemPrice"

describe("Item price value object", () => {
    test("It should fail with null prices", () => {
        expect(ItemPrice.create({price: null} as unknown as ItemPriceProps).isLeft()).toBe(true)
        expect(ItemPrice.create({price: undefined} as unknown as ItemPriceProps).isLeft()).toBe(true)
        expect(ItemPrice.create({price: ''} as unknown as ItemPriceProps).isLeft()).toBe(true)
    })

    test("It should fail when provided with invalid values", () => {
        expect(ItemPrice.create({price: () => {}} as unknown as ItemPriceProps).isLeft()).toBe(true)
        expect(ItemPrice.create({price: {}} as unknown as ItemPriceProps).isLeft()).toBe(true)
        expect(ItemPrice.create({price: []} as unknown as ItemPriceProps).isLeft()).toBe(true)
        expect(ItemPrice.create({price: 0.00001} as unknown as ItemPriceProps).isLeft()).toBe(true)
        expect(ItemPrice.create({price: 0} as unknown as ItemPriceProps).isLeft()).toBe(true)
        expect(ItemPrice.create({price: -20} as unknown as ItemPriceProps).isLeft()).toBe(true)
        expect(ItemPrice.create({price: "12"} as unknown as ItemPriceProps).isLeft()).toBe(true)
    })

    test("It should be created with valid numbers", () => {
        expect(ItemPrice.create({price: 123.12}).isRight()).toBe(true)
        // expect(ItemPrice.create({price: 33}).isRight()).toBe(true)
        expect(ItemPrice.create({price: 333.44444} as unknown as ItemPriceProps).isRight()).toBe(true)
    })

    test("After creation, it should get the name value correctly", () => {
        expect((ItemPrice.create({price: 10.4412}).value as ItemPrice).value).toBe(10.44)
        expect((ItemPrice.create({price: 20.00001}).value as ItemPrice).value).toBe(20)
    })

})