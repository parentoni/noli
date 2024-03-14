import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IItem } from "../../../../shared/infra/database/models/Item";
import { Item } from "../../domain/item";
import { ItemName } from "../../domain/itemProps/itemName";
import { ItemImage } from "../../domain/itemProps/itemImage";
import { ItemPrice } from "../../domain/itemProps/itemPrice";
import { ItemDescription } from "../../domain/itemProps/itemDescription";
import { ItemStore } from "../../domain/itemProps/itemStoreId";
import { EitherUtils } from "../../../../shared/utils/EitherUtils";
import { itemRepo } from "../../repo";
import { CreateItemDTO } from "./createItemDTO";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { storeRepo } from "../../../store/repo";

export class CreateItemUseCase implements UseCase<CreateItemDTO, Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, null>>> {

    async execute(item: CreateItemDTO ): Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, null>> {
        try {

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

        // Checks if item store exists
        // const exists = await storeRepo.exists(storeIdOrError.getRight().value)

        // if (exists.isLeft() || exists.getRight() === false) {
        //     return left(CommonUseCaseResult.InvalidValue.create({
        //         errorMessage: `A store could not be found with the specified ID`,
        //         variable: "ITEM_STORE_ID",
        //         location: `${CreateItemUseCase.name}.execute`
        //     }))
        // }

        // Creates item domain
        const itemDomain = Item.create({
            name : nameOrError.getRight(),
            image : imageOrError.getRight(),
            price : priceOrError.getRight(),
            description : descriptionOrError.getRight(),
            storeId : storeIdOrError.getRight()
        }, undefined)

        if (itemDomain.isLeft()) {
            return left(itemDomain.value)
        }
        
        // Runs repo function to create item in
        const itemMongo = await itemRepo.upsert(itemDomain.value)

        if (itemMongo.isLeft()) {
            return left(itemMongo.value)
        }

        return right(null)


    } catch (err) {
        return left(CommonUseCaseResult.UnexpectedError.create(err))
    }
    }
}
