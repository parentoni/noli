import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../shared/core/result";
import { IStore } from "../../../shared/infra/database/models/Store";
import { IStoreRepo } from "./IStoreRepo";
import { Store } from "../domain/store";
import { StoreModel } from "../../../shared/infra/database/models/Store";
import { StoreMapper } from "../mappers/storeMapper";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
export class StoreRepoMongo implements IStoreRepo {

    async upsert(store : Store) : Promise<Either<CommonUseCaseResult.UnexpectedError, null>> {
        try {
            // Turns domain to persistent
            const PersistentStore = StoreMapper.toPersistent(store)
            // Checks if store already exists
            const exists = await StoreModel.exists({_id : PersistentStore.getRight()._id})

            if (exists === null) {
                await StoreModel.create(store)
            } else {
                await StoreModel.findOneAndUpdate({_id : PersistentStore.getRight()._id}, PersistentStore)
            }

            return right(null)

        }catch (err) {
            // Returns left if mongo throws an error
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

    async exists(id : string) : Promise<Either<CommonUseCaseResult.UnexpectedError, true | false>> {
        try {
            const exists = await StoreModel.exists({_id : id})

            if (exists === null) {
                // Returns false if store does not exist
                return right(false)
            }
            // Returns true if store exists
            return right(true)
        }catch (err) {
            // Returns left if mongo throws an error
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

    async getAll(): Promise<Either<CommonUseCaseResult.UnexpectedError, IStore[]>> {
        try {
            const stores = await StoreModel.find()

            return right(stores)

        }catch (err) {
            // Returns left if mongo throws an error
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

    async findById(id: UniqueGlobalId): Promise<Either<CommonUseCaseResult.UnexpectedError, Store | null>> {
        try {
            // Gets store
            const store = await StoreModel.findOne({_id : id})
            // Checks if store was found
            if (store) {
                // Turns store to domain
                const storeDomain = StoreMapper.toDomain(store)

                if (storeDomain.isLeft()) {
                    return left(CommonUseCaseResult.UnexpectedError.create({
                        errorMessage: `There was an error creating store domain`,
                        variable: "STORE_FIND_BY_ID",
                        location: `${StoreRepoMongo.name}.findById`
                    }))
                }
                // Returns store if no errors are thrown
                return right(storeDomain.value)
            }

            // Returns null if store could not be found but no error was thrown
            return right(null)

        }catch (err) {
            // Returns unexpected error if mongo throws an error
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }


}