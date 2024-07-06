import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {catchError, Observable, switchMap, throwError} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();


    if (request.headers.has('skipInterceptor')) {
      const headers = request.headers.delete('skipInterceptor');
      const clonedRequest = request.clone({ headers });
      return next.handle(clonedRequest);
    }


    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if ((error.status === 401 || error.status === 403) && localStorage.getItem('refreshToken')) {
          return this.handleAuthError(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleAuthError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = localStorage.getItem('refreshToken') ?? '';
    return this.authService.refreshToken(refreshToken).pipe(
      switchMap((response: any) => {
        localStorage.setItem('token', response.token);
        return next.handle(this.addToken(request, response.token));
      }),
      catchError(error => {
        this.authService.logout();
        return throwError(error);
      })
    );
  }
}
