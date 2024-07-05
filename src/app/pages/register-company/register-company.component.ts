import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CompanyProfileService} from "../company-profile/services/company-profile.service";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIcon,
    NgIf
  ],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private companyService: CompanyProfileService,
    private authService: AuthService

  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]*')]], // Accetta solo numeri
      address: ['', Validators.required],
      website: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  register(): void {
    if (this.form.valid) {
      const companyData = {
        ...this.form.value
      }
      console.log(this.form.value);
      this.companyService.registerCompany(companyData).subscribe(
        (response: any) => {
          console.log('company registered successfully:', response);
          this.goToPage(companyData);
        },
        (error: any) => {
          console.error('Error registering company', error);
        }
      );
    } else {
      console.error('Form is invalid');
      this.markFormGroupTouched(this.form);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
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

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onKeyDown(event: KeyboardEvent): boolean {
    const inputValue = (event.target as HTMLInputElement).value;

    if (
      (event.key >= '0' && event.key <= '9') ||
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)
    ) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  goHome(): void {
    this.router.navigateByUrl('');
  }

}
