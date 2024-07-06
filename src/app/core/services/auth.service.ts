import {BehaviorSubject, catchError, Observable, of, shareReplay, tap, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {endpoints} from "../constants/endpoints";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {pages} from "../constants/pages";
import {
  LogoutConfirmDialogComponent
} from "../../shared/components/logout-confirm-dialog/logout-confirm-dialog.component";
import {BaseApiService} from "./base-api.service";
import {AlertDialogComponent} from "../../shared/components/alert-dialog/alert-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) { }

  login(email: string, password: string) {

    const headers = new HttpHeaders().set('skipInterceptor', '');


    return this.http.post<any>(endpoints.login, { email, password }, { headers, observe: 'response' }).pipe(
      shareReplay(),
      tap({
        next: (response) => {
          if (response.status === 200 && response.body) {
            localStorage.setItem('token', response.body.token);
            localStorage.setItem('refreshToken', response.body.refreshToken);
            localStorage.setItem('email', email);
          } else {
            console.error('Invalid login response structure:', response);
            throw new Error('Invalid login response structure');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
        }
      }),
      catchError(error => {
        this.openDialog();
        return throwError(error); // Ritorna un Observable con l'errore per ulteriori gestioni a valle
      })
    );
  }

  refreshToken(refreshToken: string){
    return this.http.post<any>(endpoints.refresh, {refreshToken}, {observe: 'response'}).pipe(
      tap(response =>{
        if(response.status === 200){
          localStorage.setItem('token', response.body.refreshToken);
        }
      })
    )
  }

  getRoleFromToken(token: string): string {
    const payload = this.parseJwt(token);
    return payload.role;
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  logout(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(LogoutConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Pulizia del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        // Navigazione verso la pagina di accesso
        this.router.navigate([pages.loginWindow]);
      }
    });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  openDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      data: {title: 'Authentication Error', message: 'An error occurred during authentication.\n Please check your credentials and try again.'}
    });
  }
}
