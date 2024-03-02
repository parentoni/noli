import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../shared/core/result";
import { IStore } from "../../../shared/infra/database/models/Store";
import { IStoreRepo } from "./IStoreRepo";
import { Store } from "../domain/store";
import { StoreModel } from "../../../shared/infra/database/models/Store";
import { StoreMapper } from "../mappers/storeMapper";
export class StoreRepoMongo implements IStoreRepo {
    async upsert(store : Store) : Promise<Either<CommonUseCaseResult.UnexpectedError, null>> {
        try {
            // Turns domain to persistent
            const PersistentStore = StoreMapper.toPersistent(store)
            // Checks if store already exists
            const exists = await StoreModel.exists({_id : PersistentStore._id})

            if (exists === null) {
                await StoreModel.create(store)
            } else {
                await StoreModel.findOneAndUpdate({_id : PersistentStore._id}, PersistentStore)
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
}