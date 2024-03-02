import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { TextUtils } from "../../../../shared/utils/TextUtils";
import { Guard } from "../../../../shared/core/Guard";
export interface ItemNameProps {
    name : string
}
export class ItemName extends ValueObject<ItemNameProps> {
    get value() : string {
        return this.props.name
    }

    public static create(props : ItemNameProps) : Either<CommonUseCaseResult.InvalidValue, ItemName> {
        // Trims name
        const trimmedName = TextUtils.trim(props.name)

        // Check for empty value
        const GuardResponse = Guard.againstNullOrUndefined(trimmedName, "ITEM_NAME")
        
        if (GuardResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `The value sent is not a valid item name: ${props.name}`,
                variable: "ITEM_NAME",
                location: `${ItemName.name}.${ItemName.create.name}`
            }))
        }

        return right(new ItemName({name : trimmedName}))
    }
}