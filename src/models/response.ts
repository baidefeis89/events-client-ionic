import { IEvent } from "./event";

export interface IResponse {
    ok: boolean,
    event?: IEvent,
    events?: IEvent[],
    error?: string
}
