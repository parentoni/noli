import { IItem } from "./Item"

export interface IOrder {
    _id : string,
    child : Child,
    parent : string,
    days : Day,
    items : IItem[],
    storeId : string
}

export interface Day {
    day : Date,
    period : Period
}

enum Period {
    MANHA = "MANHA",
    TARDE = "TARDE"
}

export interface Child {
    name : string,
    classroom: string
}