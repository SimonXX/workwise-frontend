import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const candidateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthService); // Inietta il servizio AuthService
  const token = localStorage.getItem('token');
  const role = authService.getRoleFromToken(token ?? ''); // Usa il metodo getRoleFromToken del servizio AuthService

  if (role === 'CANDIDATE') {
    return true;
  } else {
    return router.navigate(['/login']);
  }
};
