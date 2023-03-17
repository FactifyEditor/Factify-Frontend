import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import {catchError} from 'rxjs/operators';  
import { Observable } from 'rxjs';
import {AuthService} from 'src/app/services/auth.service'
@Injectable()
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  token: string;
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = this.authService.getToken();
    if (this.token) {
      const tokenizedReq = req.clone({ headers: req.headers.set('x-access-token',  this.token) });
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }
}