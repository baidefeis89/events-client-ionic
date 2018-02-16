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
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Storage } from '@ionic/storage';
import { IUser } from '../../models/user';

@Injectable()
export class AuthProvider {
    url: string = 'http://www.ivangalan.tk:8080';

    constructor(public http: HttpClient, public storage: Storage) {}

    login(user: IUser): Observable<{}> {
    return this.http
      .post(`${this.url}/auth/login`, user)
      .catch((response: HttpErrorResponse) => {
        if (response.status == 200) return Observable.throw(response.message);
        else
          return Observable.throw(
            `Unknown error: ${response.statusText} (${response.status})`
          );
      }).flatMap((json: { ok: boolean; error: string; token: string }) => {
        if (!json.ok) throw json.error;
        return Observable.fromPromise(this.storage.set('token', json.token));
      });
    }

    register(user: IUser): Observable<{}> {
        return this.http.post(`${this.url}/auth/register`, user)
            .catch( (response: HttpErrorResponse) => {
                if (response.status == 200) return Observable.throw(response.message);
                else
                    return Observable.throw(`Unknown error: ${response.statusText} (${response.status})`);
            }).flatMap( (json: { ok: boolean, error: string, token: string }) => {
                if (!json.ok) throw json.error;
                return Observable.fromPromise(this.storage.set('token', json.token));
            });
    }

    loginGoogle() {
        return this.http
        .get(`${this.url}/auth/google`)
        .catch((response: HttpErrorResponse) => {
          if (response.status == 200) return Observable.throw(response.message);
          else
            return Observable.throw(
              `Unknown error: ${response.statusText} (${response.status})`
            );
        }).flatMap((json: { ok: boolean; error: string; token: string }) => {
          if (!json.ok) throw json.error;
          return Observable.fromPromise(this.storage.set('token', json.token));
        });
    }

    loginFacebook() {
        return this.http
        .get(`${this.url}/auth/facebook`)
        .catch((response: HttpErrorResponse) => {
          if (response.status == 200) return Observable.throw(response.message);
          else
            return Observable.throw(
              `Unknown error: ${response.statusText} (${response.status})`
            );
        }).flatMap((json: { ok: boolean; error: string; token: string }) => {
          if (!json.ok) throw json.error;
          return Observable.fromPromise(this.storage.set('token', json.token));
        });
    }

    isLogged(): Observable<boolean> {
        return Observable.fromPromise(this.storage.get('token'))
        .flatMap(token => {
            if (!token) return Observable.of(false);
            return this.http
            .get(`${this.url}/auth/token`)
            .map((response: { ok: boolean }) => (response.ok ? true : false))
            .catch(error => Observable.of(false));
        }).catch(error => {
            return Observable.of(false);
        });
    }
}
