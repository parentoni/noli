import { StoreName, StoreNameProps } from "../../../../../../src/modules/store/domain/storeProps/storeName"

describe("Store name value object", () => {
    test("It should fail when provided with null names", () => {
        expect(StoreName.create({email: null} as unknown as StoreNameProps).isLeft()).toBe(true)
        expect(StoreName.create({email: undefined} as unknown as StoreNameProps).isLeft()).toBe(true)
        expect(StoreName.create({email: ''} as unknown as StoreNameProps).isLeft()).toBe(true)
      })

      
})