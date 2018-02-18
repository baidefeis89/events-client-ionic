import { IEvent } from "./event";

export interface IResponse {
    ok: boolean,
    event?: IEvent,
    events?: IEvent[],
    result?: any,
    error?: string
}
