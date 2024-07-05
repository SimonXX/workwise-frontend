import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-modify-status',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatDialogClose,
    MatButton,
    MatDialogActions,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatLabel
  ],
  templateUrl: './modify-status.component.html',
  styleUrl: './modify-status.component.css'
})
export class ModifyStatusDialogComponent {
  selectedStatus: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModifyStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
