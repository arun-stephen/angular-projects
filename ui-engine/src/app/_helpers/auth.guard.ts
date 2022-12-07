import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthenticationService } from "../_service/authentication.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router:Router,
    private authService:AuthenticationService
  ){};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.userValue;
    if(user) {
      return true;
    }

    //if not logged in then redirect to login page
    this.router.navigate(["/login"], {queryParams:{requestUrl:state.url}});
    return false;
  }

}
