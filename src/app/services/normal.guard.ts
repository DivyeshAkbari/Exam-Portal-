import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

export const normalGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const router: Router = inject(Router);
  const login: LoginService = inject(LoginService);

  if(login.isLoggedin() && login.getUserRole()=='NORMAL')
  {
    return true
  }

  router.navigate(['login'])
  return true;
}