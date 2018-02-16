import { IUser } from "./user";

export interface IEvent {
    id?: number,
    creator?: IUser,
    title?: string,
    description?: string,
    date?: Date,
    price?: number,
    address?: string,
    lat?: number,
    lng?: number,
    image?: string,
    numAttend?: string,
    distance?: number,
    mine?: boolean,
    attend?: boolean
}
