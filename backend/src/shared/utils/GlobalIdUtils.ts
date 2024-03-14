import mongoose from "mongoose"
import { UniqueGlobalId } from "../domain/UniqueGlobalD"

export class GlobalIdUtils {
    public static toString(id : UniqueGlobalId) : string {
        try {
            // Turns id to string

            const stringId = id.toValue()
            // Checks if id is valid mongo id
            if (mongoose.isValidObjectId(stringId)) {
                return stringId
            }
            return ""

        }catch {
            return ""
        }
    }
}