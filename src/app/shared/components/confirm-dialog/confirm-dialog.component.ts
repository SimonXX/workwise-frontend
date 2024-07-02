import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmationDialogComponent {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = data.title || 'Conferma';
    this.message = data.message || 'Sei sicuro di voler procedere?';
    this.confirmText = data.confirmText || 'Conferma';
    this.cancelText = data.cancelText || 'Annulla';
  }

  confirm(): void {
    this.dialogRef.close(true); // Passa true quando l'utente conferma
  }
}
