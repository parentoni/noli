import mongoose from "mongoose"
import { UniqueGlobalId } from "../../../domain/UniqueGlobalD"
import { IItem } from "./Item"

export interface IOrder {
    _id : string,
    child : Child,
    parent : string,
    items : OrderItem[],
    storeId : string
}

export interface OrderItem {
    _id : string,
    name : string,
    day : Day
}

export interface Day {
    day : Date,
    period : Period
}

enum Period {
    morning = "MANHÂ",
    afternoon = "TARDE"
}

export interface Child {
    name : string,
    classroom: string
}

interface OrderItemMongoose {
    _id : mongoose.Types.ObjectId,
    name : string,
    day : Day
}

const OrderSchema = new mongoose.Schema({
    child : {type : Object, required : true},
    parent : {type : String, required: true},
    items : {type : Array<OrderItemMongoose>, required: true},
    storeId : {type : mongoose.Types.ObjectId, required: true},
})