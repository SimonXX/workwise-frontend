import { Injectable } from '@angular/core';
import {ConfirmationDialogComponent} from "../confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmationDialog(data: any): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: data
    });
  }
}
