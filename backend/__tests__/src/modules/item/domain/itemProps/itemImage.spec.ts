import { ItemImage, ItemImageProps } from "../../../../../../src/modules/item/domain/itemProps/itemImage"

describe("Store name value object", () => {
    test("It should fail when provided with null names", () => {
        expect(ItemImage.create({image: null} as unknown as ItemImageProps).isLeft()).toBe(true)
        expect(ItemImage.create({image: undefined} as unknown as ItemImageProps).isLeft()).toBe(true)
        expect(ItemImage.create({image: ''} as unknown as ItemImageProps).isLeft()).toBe(true)
      })

  test("It should fail when provided with non string names", () => {
    expect(ItemImage.create({image: () => {}} as unknown as ItemImageProps).isLeft()).toBe(true)
    expect(ItemImage.create({image: {}} as unknown as ItemImageProps).isLeft()).toBe(true)
    expect(ItemImage.create({image: []} as unknown as ItemImageProps).isLeft()).toBe(true)
    expect(ItemImage.create({image: 42} as unknown as ItemImageProps).isLeft()).toBe(true)
  })

  test("It should be created with valid names", () => {
    expect(ItemImage.create({image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.unileverfoodsolutions.com.br%2Freceita%2Fstrogonoff-de-frango-R0082298.html&psig=AOvVaw1t3zL1hGymEKaQ-8qhwKU9&ust=1709336258260000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDv_ojc0YQDFQAAAAAdAAAAABAE"}).isRight()).toBe(true)
    expect(ItemImage.create({image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.receiteria.com.br%2Freceita%2Fstrogonoff-de-frango-simples%2F&psig=AOvVaw1t3zL1hGymEKaQ-8qhwKU9&ust=1709336258260000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDv_ojc0YQDFQAAAAAdAAAAABAI"}).isRight()).toBe(true)
    expect(ItemImage.create({image: "https://s2-receitas.glbimg.com/9WejV7JkgYxS1dqzDt1MoupQg_0=/0x0:1024x576/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2023/q/P/BOoA4STbAP9EGefsySgQ/strogonoff-de-frango-receita-facil-e-deliciosa-2-.jpg"} as unknown as ItemImageProps).isRight()).toBe(true)
  })

  test("After creation, it should get the name value correctly", () => {
    expect((ItemImage.create({image: "   https://s2-receitas.glbimg.com/9WejV7JkgYxS1dqzDt1MoupQg_0=/0x0:1024x576/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2023/q/P/BOoA4STbAP9EGefsySgQ/strogonoff-de-frango-receita-facil-e-deliciosa-2-.jpg    "}).value as ItemImage).value).toBe("https://s2-receitas.glbimg.com/9WejV7JkgYxS1dqzDt1MoupQg_0=/0x0:1024x576/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2023/q/P/BOoA4STbAP9EGefsySgQ/strogonoff-de-frango-receita-facil-e-deliciosa-2-.jpg")
    // expect((ItemImage.create({image: "Henrique Kitaya.10   "}).value as ItemImage).value).toBe("Henrique Kitaya.10")
  })
})