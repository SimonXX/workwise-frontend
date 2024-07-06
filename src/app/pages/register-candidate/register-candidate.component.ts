import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {DatePipe, NgIf} from "@angular/common";
import {MatInput, MatSuffix} from "@angular/material/input";
import {CandidateProfileService} from "../candidate-profile/services/candidate-profile.service";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {AlertDialogComponent} from "../../shared/components/alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register-candidate',
  standalone: true,
  imports: [
    FormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    DatePipe,
    MatInput,
    ReactiveFormsModule,
    MatSuffix,
    MatIcon,
    NgIf
  ],
  templateUrl: './register-candidate.component.html',
  styleUrl: './register-candidate.component.css'
})
export class RegisterCandidateComponent implements OnInit {
  form!: FormGroup;
  showError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private candidateProfileService: CandidateProfileService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]*')]], // Accetta solo numeri
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  register(): void {
    if (this.form.valid) {
      const userData = {
        ...this.form.value,
        dateOfBirth: this.form.value.dateOfBirth.toISOString().split('T')[0]
      };

      this.candidateProfileService.registerUser(userData).subscribe(
        (response: any) => {
          console.log('User registered successfully:', response);
          this.goToPage(userData);
        },
        (error: any) => {
          console.error('Error registering user:', error);
        }
      );
    } else {
      console.log('Form is invalid');
      this.showError = true; // Attiva il flag per mostrare il messaggio di errore
    }
  }

  goToPage(userData: any): void {
    this.authService.login(userData.email, userData.password).subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log("User is logged in");
          const token = response.body.token;
          const role = this.authService.getRoleFromToken(token);
          if (role === 'CANDIDATE') {
            this.router.navigateByUrl('/candidateArea');
          } else if (role === 'COMPANY') {
            this.router.navigateByUrl('/companyArea');
          } else {
            console.error('Unknown role', role);
          }
        }
      },
      error: (error) => {
        console.error("Login failed", error);
      },
      complete: () => {
        console.log("Login request complete");
      }
    });
  }

  goHome(): void {
    this.router.navigateByUrl('');
  }
  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
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


}
