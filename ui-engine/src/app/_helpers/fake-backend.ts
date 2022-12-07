import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, dematerialize, materialize, mergeMap } from "rxjs/operators";
import { User } from "../_models";

const users: User[] = [
  { id: 1, username: 'admin', password: 'admin@123', firstName: 'Arun', lastName: 'Admin'},
  { id: 2, username: 'user', password: 'user@123', firstName: 'Arun', lastName: 'User'}];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                default:
                    return next.handle(req);
            }
        }

        function authenticate() {
          const { username, password } = body;
          const user = users.find(x => x.username === username && x.password === password);
          if (!user) return error('Username or password is incorrect');
          return ok({
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName
          })
      }

      function getUsers() {
          if (!isLoggedIn()) return unauthorized();
          return ok(users);
      }

      function ok(body?:any) {
          return of(new HttpResponse({ status: 200, body }))
      }

      function error(message:string) {
          return throwError({ error: { message } });
      }

      function unauthorized() {
          return throwError({ status: 401, error: { message: 'Unauthorised' } });
      }

      function isLoggedIn() {
          return (headers.get('Authorization') === `Basic ${window.btoa('admin:admin@123')}`) ||
          (headers.get('Authorization') === `Basic ${window.btoa('user:user@123')}`);
      }
  }
}
export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
