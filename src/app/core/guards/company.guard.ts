import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const companyGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthService); // Inietta il servizio AuthService
  const token = localStorage.getItem('token');
  const role = authService.getRoleFromToken(token ?? ''); // Usa il metodo getRoleFromToken del servizio AuthService

  if (role === 'COMPANY') {
    return true;
  } else {
    return router.navigate(['/login']);
  }
};
