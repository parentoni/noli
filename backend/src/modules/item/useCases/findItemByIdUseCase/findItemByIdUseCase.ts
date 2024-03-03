import { UseCase } from "../../../../shared/core/UseCase";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { IItem } from "../../../../shared/infra/database/models/Item";
import { Either, left, right } from "../../../../shared/core/result";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { itemRepo } from "../../repo";
import { ItemMap } from "../../mappers/itemMapper";

export class FindItemByIdUseCase implements UseCase<string, Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, IItem>>> {
    
    async execute(id: string): Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, IItem>> {
        try {

            // Creates unique id
            const uniqueId = new UniqueGlobalId(id)
            // Finds item
            const item = await itemRepo.findById(uniqueId)
            
            //Checks if error ocurred
            if (item.isLeft()) {
                return left(item.value)
            } 
            // Checks if no errors ocurred but item was not found
            else if (item.value === null) {
                return left(CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `An item was not found with the specified ID: ${id}`,
                    variable: "ITEM_BY_ID",
                    location: `${FindItemByIdUseCase.name}.execute`
                }))
            }
            // Turns domain value to persistent
            const itemPersistent = ItemMap.toPersistent(item.value)

            return right(itemPersistent.getRight())


        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
        
    }
}