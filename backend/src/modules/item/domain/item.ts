import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { ItemDescription } from "./itemProps/itemDescription";
import { ItemImage } from "./itemProps/itemImage";
import { ItemName } from "./itemProps/itemName";
import { ItemPrice } from "./itemProps/itemPrice";
import { ItemStore } from "./itemProps/itemStoreId";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { Either, left, right } from "../../../shared/core/result";
import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Guard } from "../../../shared/core/Guard";
export interface ItemProps {
    name : ItemName,
    description : ItemDescription,
    image : ItemImage,
    price : ItemPrice,
    storeId : ItemStore
}

export class Item extends AggregateRoot<ItemProps>{

    get name(): string {
        return this.props.name.value
    }

    get description(): string {
        return this.props.description.value
    }

    get image(): string {
        return this.props.image.value
    }

    get price(): number {
        return this.props.price.value
    }

    get storeId(): UniqueGlobalId {
        return this.props.storeId.value
    }

    private constructor(props: ItemProps, id?: UniqueGlobalId | undefined) { 
        super(props, id)
    }

    public static create(props : ItemProps, id: UniqueGlobalId | undefined) : Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Item>{
        // Checks for null values
        const GuardResponse = Guard.againstNullOrUndefinedBulk([
            { argument : props.description, argumentName: "ITEM_DESCRIPTION"}, 
            {argument : props.name, argumentName : "ITEM_NAME"}, 
            {argument : props.image, argumentName : "ITEM_IMAGE"},
            {argument : props.price, argumentName : "ITEM_PRICE"},
            {argument : props.storeId, argumentName : "ITEM_STORE"},
        ])

        
            if (GuardResponse.isLeft()) {
                return left(GuardResponse.value)
            }
            // return right if all values are valid
            return right(new Item(props, id))
        }


    }


