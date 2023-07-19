
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private login:LoginService){

  }
 intercept(
    request: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {

      //add the jwt token to local storage 

      let authRequ=request;
      const token=this.login.getToken();
      if(token!=null)
      {
        console.log("ohhh ");
        authRequ=authRequ.clone({
        setHeaders:{Authorization:`bearer ${token}`},
        });
      }
    return next.handle(authRequ);
  }
}

//this is configuration
//now we have to register this interceptor to the app.module.ts by importing it 

export const authInterceptorProviders=[
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true,

  }
]