import {ActivatedRoute, Router} from "@angular/router";

;import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {AuthService} from "../../core/services/auth.service";
import {CandidateProfileService} from "./services/candidate-profile.service";
import {User, UserImpl} from "../../core/models/user.model";

@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    FormsModule,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatLabel,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSuffix,
  ],
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.css'
})
export class CandidateProfileComponent implements OnInit{
  user: User;
  editedUser: User;
  viewCompany: boolean = false;


  //email: String = localStorage.getItem('email') || '';
  email: string = '';
  editingMode = false; // Variabile per gestire lo stato di editing
  selectedFile: File | null = null;

  constructor(private router: Router, private authService: AuthService, private candidateProfileService: CandidateProfileService, private route: ActivatedRoute) {
    this.user = new UserImpl();
    this.editedUser = new UserImpl();

    this.route.queryParams.subscribe(params => {
      this.email= params['email'] || null;
      this.viewCompany = params['viewCompany'];
    });
  }

  ngOnInit(): void {
    this.loadMyUser();
  }

  loadMyUser(): void {
    const observer = {
      next: (response: any) => {
        this.user = response;
        this.editedUser = response;
      },
      error: (error: any) => {
        console.error('Error loading User Information', error);
      }
    };
    this.candidateProfileService.getMyInformation(this.email).subscribe(observer);
  }

  goToCandidateArea(): void {
    // Naviga alla pagina candidateArea
    this.router.navigate(['/candidateArea']);
  }

  editProfile() {
    this.editingMode = true;
    console.log(this.editedUser);
  }



  saveChanges() {
    console.log(this.editedUser);


    const observer = {
      next: (response: any) => {
        this.user = response // Assegna la risposta all'oggetto user
        // this.editedCompany = response;
        console.log(this.user);
      },
      error: (error: any) => {

        console.error('Error loading Modify User Information', error);
      }
    };
    this.candidateProfileService.updateUserInformation(this.editedUser).subscribe(observer);
    this.editingMode = false;
  }

  cancelEditing() {
    this.editingMode = false;
    this.editedUser = this.user;
    this.loadMyUser();
  }

// Metodo per gestire l'evento keydown per il campo telefono
  onKeyDown(event: KeyboardEvent) {
    // Ottieni il valore dell'input corrente
    const inputValue = (event.target as HTMLInputElement).value;

    // Controlla se il tasto premuto è un numero o il tasto Backspace/Delete
    if (
      // Numeri da 0 a 9
      (event.key >= '0' && event.key <= '9') ||
      // Tasti speciali per la gestione dell'input (Backspace, Delete)
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)
    ) {
      // Se il tasto è valido, permetti l'input
      return true;
    } else {
      // Altrimenti, previeni l'input del carattere
      event.preventDefault();
      return false;
    }
  }
  logout(): void {
    this.authService.logout();
  }
  protected readonly localStorage = localStorage;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadCV(): void {
    console.log(this.editedUser.cvBase64);
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editedUser.cvBase64 = e.target.result.split(',')[1];
        this.saveChanges();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  downloadCV(): void {
    if (this.user.cvBase64) {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${this.user.cvBase64}`;
      link.download = 'CV.pdf';
      link.click();
    }
  }


}
