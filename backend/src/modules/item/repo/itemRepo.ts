import { IItemRepo } from "./IItemRepo";
import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../shared/core/result";
import { Item } from "../domain/item";
import { ItemMap } from "../mappers/itemMapper";
import { IItem, ItemModel } from "../../../shared/infra/database/models/Item";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
export class ItemRepoMongo implements IItemRepo {
    async upsert(item : Item) : Promise<Either<CommonUseCaseResult.UnexpectedError, null>> {
        try {
            
                // Turns domain to persistent
                const PersistentItem = ItemMap.toPersistent(item)
                // Checks if store already exists
                const exists = await ItemModel.exists({_id : PersistentItem._id})
    
                if (exists === null) {
                    await ItemModel.create(item)
                } else {
                    await ItemModel.findOneAndUpdate({_id : PersistentItem._id}, PersistentItem)
                }
    
                return right(null)

        }catch (err) {
            // Returns unexpected error if mongo throws an error
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

    async findByStore(id: UniqueGlobalId): Promise<Either<CommonUseCaseResult.UnexpectedError, IItem[]>> {
        try {
            // Gets items of the specified storeId
            const items = await ItemModel.find({storeId : id})

            return right(items)

        }catch (err) {
            // Returns unexpected error if mongo throws an error
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

    async findById(id: UniqueGlobalId): Promise<Either<CommonUseCaseResult.UnexpectedError, Item | null>> {
        try {
            // Gets item
            const item = await ItemModel.findOne({_id : id})
            // Checks if item was found
            if (item) {
                // Turns item to domain
                const itemDomain = ItemMap.toDomain(item)

                if (itemDomain.isLeft()) {
                    return left(CommonUseCaseResult.UnexpectedError.create({
                        errorMessage: `There was an error creating item domain`,
                        variable: "ITEM_FIND_BY_ID",
                        location: `${ItemRepoMongo.name}.findById`
                    }))
                }
                // Returns item if no errors are thrown
                return right(itemDomain.value)
            }

            // Returns null if item could not be found but no error was thrown
            return right(null)


        }catch (err) {
            // Returns unexpected error if mongo throws an error
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

    
}