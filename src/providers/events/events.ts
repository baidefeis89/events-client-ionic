import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { HttpErrorResponse } from '@angular/common/http/src/response'
import { IEvent } from '../../models/event';
import { IResponse } from '../../models/response';

@Injectable()
export class EventProvider {
    url: string = 'http://www.ivangalan.tk:8080';

    constructor(public http: HttpClient) {}

    getEvents(): Observable<IEvent[]> {
        return this.http.get(`${this.url}/events`).flatMap( (res: IResponse) => {
            if (!res.ok) throw res.error;
            res.events.map( ev => {
                ev.image = `${this.url}/img/events/${ev.image}`;
                ev.creator.avatar = `${this.url}/img/users/${ev.creator.avatar}`;
            })
            return Observable.of(res.events);
        });
    }

}
