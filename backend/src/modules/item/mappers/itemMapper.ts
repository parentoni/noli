import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../shared/core/result";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { IItem } from "../../../shared/infra/database/models/Item";
import { EitherUtils } from "../../../shared/utils/EitherUtils";
import { Item } from "../domain/item";
import { ItemDescription } from "../domain/itemProps/itemDescription";
import { ItemImage } from "../domain/itemProps/itemImage";
import { ItemName } from "../domain/itemProps/itemName";
import { ItemPrice } from "../domain/itemProps/itemPrice";
import { ItemStore } from "../domain/itemProps/itemStoreId";


export class ItemMap {
    public static toPersistent(item : Item) : IItem{
        // Turns domain value into persistent
        return {
            _id : item.id.toValue(),
            name : item.name,
            image : item.image,
            price : item.price,
            description : item.description,
            storeId : item.storeId.toValue()
        }
    }

    public static toDomain(item : IItem) : Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Item> {
        // Create properties
        const nameOrError = ItemName.create({name : item.name})
        const imageOrError = ItemImage.create({image : item.image})
        const priceOrError = ItemPrice.create({price : item.price})
        const descriptionOrError = ItemDescription.create({description : item.description})
        const storeIdOrError = ItemStore.create({storeId : new UniqueGlobalId(item.storeId)})

        // Checks if all values are valid
        const combineResponse = EitherUtils.combine([nameOrError, imageOrError, priceOrError, descriptionOrError, storeIdOrError])

        if (combineResponse.isLeft()) {
            return left(combineResponse.value)
        }
        // Creates domain item
        const itemDomain = Item.create({
            name : nameOrError.getRight(),
            image : imageOrError.getRight(),
            price : priceOrError.getRight(),
            description : descriptionOrError.getRight(),
            storeId : storeIdOrError.getRight()
        }, new UniqueGlobalId(item._id))

        // Checks for error when creating domain item
        if (itemDomain.isLeft()) {
            return left(itemDomain.value)
        }

        return right(itemDomain.value)

    }
}