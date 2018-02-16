import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
    return Observable.fromPromise( this.storage.get('token') ).switchMap( token => {
        if (token) {
            const authReq = req.clone({
              headers: req.headers.set('Authorization',  token)
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    })
  }

  constructor(private storage: Storage) { }

}