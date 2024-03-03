import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { IItem } from "../../../../shared/infra/database/models/Item";
import { itemRepo } from "../../repo";


export class GetItemsByStoreUseCase implements UseCase<string, Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, IItem[]>>> {

    async execute(id : string) : Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, IItem[]>> {
        try {

        // Create unique global id
            const uniqueId = new UniqueGlobalId(id)
            // Gets items
            const items = await itemRepo.findByStore(uniqueId)
            
            if (items.isLeft()) {
                return left(CommonUseCaseResult.UnexpectedError.create(items.value))
            }

            return right(items.value)


        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }

    }
}