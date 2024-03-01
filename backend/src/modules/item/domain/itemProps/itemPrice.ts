import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { NumberUtils } from "../../../../shared/utils/NumberUtils";

export interface ItemPriceProps {
    price : number
}

export class ItemPrice extends ValueObject<ItemPriceProps> {
    get value() : number {
        return this.props.price
    }

    public static create(props : ItemPriceProps) : Either<CommonUseCaseResult.InvalidValue, ItemPrice> {
        // Checks if number is bigger than 0
        const sanitizedNumber = NumberUtils.checkLength(props.price)

        // Checks if number is undefined
        const GuardResponse = Guard.againstNullOrUndefined(sanitizedNumber, "ITEM_PRICE")
        
        if (GuardResponse.isLeft()) {
            return left(GuardResponse.value)
        }
        // Returns new item price if everything is right
        return right(new ItemPrice({price : Number(sanitizedNumber)}))
    }
}