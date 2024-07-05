import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AlertDialogComponent} from "../../shared/components/alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          if (error.status === 500 && error.error.message.toLowerCase().includes('application already exists')) {
            this.openApplicationExistsDialog();

            errorMessage = 'Application already exists for this job offer';
          } else if(error.status === 409 && error.error.message.toLowerCase().includes('already in use')){
            this.openEmailExistsDialog();
          }
          else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }

        // Here we can log the error to an external service or perform some other action
        console.error(errorMessage);

        // Return a new observable with a user-facing error message
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private openApplicationExistsDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      data: { message: 'Application already exists for this job offer' }
    });
  }

  private openEmailExistsDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      data: { title: 'Error', message: 'Email already exists in this system' }
    });
  }
}
