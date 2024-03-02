import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { TextUtils } from "../../../../shared/utils/TextUtils";

export interface ItemImageProps {
    image : string
}

export class ItemImage extends ValueObject<ItemImageProps> {
    get value() : string {
        return this.props.image
    }

    public static create(props : ItemImageProps) : Either<CommonUseCaseResult.InvalidValue, ItemImage> {

        const trimmedImage = TextUtils.trim(props.image)

        let res = trimmedImage.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

        if (!res) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `The value sent is not a valid image: ${props.image}`,
                variable: "ITEM_IMAGE",
                location: `${ItemImage.name}.${ItemImage.create.name}`
            }))
        }

        return right(new ItemImage({image : trimmedImage}))
    }
}