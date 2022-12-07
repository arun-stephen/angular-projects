import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_service/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(
    private authService:AuthenticationService
  ){};

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authService.userValue;
    const loggedIn = user && user.authdata;
    const isApiUrl = req.url.startsWith(environment.apiUrl);

    if(loggedIn && isApiUrl) {
      req = req.clone({
        setHeaders:{
          Authorization: `Basic ${user.authdata}`
        }
      });
    }

    return next.handle(req);
  }
}
