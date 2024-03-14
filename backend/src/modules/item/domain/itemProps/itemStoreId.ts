import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { GlobalIdUtils } from "../../../../shared/utils/GlobalIdUtils";
export interface ItemStoreProps {
    storeId : UniqueGlobalId
}

export class ItemStore extends ValueObject<ItemStoreProps> {
    get value() : UniqueGlobalId {
        return this.props.storeId
    }

    public static create(props : ItemStoreProps) : Either<CommonUseCaseResult.InvalidValue, ItemStore> {
        //Turns id into string
        const stringId = GlobalIdUtils.toString(props.storeId)
        // Checks for invalid value
        const GuardResponse = Guard.againstNullOrUndefined(stringId, "ITEM_STORE_ID")
        if (GuardResponse.isLeft()) {
            
            return left(GuardResponse.value)
        }

        return right(new ItemStore(props))

    }
}