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

    getEventsFromUser(idUser): Observable<IEvent[]> {
        return this.http.get(`${this.url}/events/user/${idUser}`).flatMap( (res: IResponse) => {
            if (!res.ok) throw res.error;
            res.events.map( ev => {
                ev.image = `${this.url}/img/events/${ev.image}`;
            });
            return Observable.of(res.events);
        });
    }

    getEvent(eventId: number): Observable<IEvent> {
        return this.http.get(`${this.url}/events/${eventId}`).flatMap( (res: IResponse) => {
            if (!res.ok) throw res.error;
            res.event.image = `${this.url}/img/events/${res.event.image}`;
            res.event.creator.avatar = `${this.url}/img/users/${res.event.creator.avatar}`;
            return Observable.of(res.event);
        });
    }

    addEvent(event: IEvent): Observable<boolean> { 
        return this.http.post(`${this.url}/events`, event).map( (response: {ok: boolean, error?: string}) => {
          if (response.ok) return response.ok;
          console.log(response.error);
          throw response.error;
        });
      }

    getAttend(eventId: number): Observable<any> {
        return this.http.get(`${this.url}/users/event/${eventId}`).flatMap( (res: IResponse) => {
            if (!res.ok) throw res.error;
            res.result.map( user => {
                user.avatar = `${this.url}/img/users/${user.avatar}`
            });
            return Observable.of(res.result);
        })
    }

    deleteEvent(eventId: number): Observable<boolean> {
        return this.http.delete(`${this.url}/events/${eventId}`).flatMap( (res: IResponse) => {
            if (!res.ok) throw res.error;
            return Observable.of(true);
        });
    }

}
