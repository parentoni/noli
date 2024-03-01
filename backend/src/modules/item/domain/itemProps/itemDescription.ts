import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { TextUtils } from "../../../../shared/utils/TextUtils";

export interface ItemDescriptionProps {
    description : string
}

export class ItemDescription extends ValueObject<ItemDescriptionProps> {
    get value() : string {
        return this.props.description
    }

    public static create(props : ItemDescriptionProps) : Either<CommonUseCaseResult.InvalidValue, ItemDescription> {
        // Trims description and checks for invalid value
        const trimmedDescription = TextUtils.trim(props.description)
        // Checks for null/undefined value
        const GuardResponse = Guard.againstNullOrUndefined(trimmedDescription, "ITEM_DESCRIPTION")

        if (GuardResponse.isLeft()) {
            return left(GuardResponse.value)
        }

        return right(new ItemDescription({description: trimmedDescription}))
    }
}