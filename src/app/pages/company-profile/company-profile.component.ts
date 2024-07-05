import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Company, CompanyImpl} from "../../core/models/company.model";
import {CompanyProfileService} from "./services/company-profile.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit {

  company: Company;
  editedCompany: Company; // Use Company type for editedCompany

  editingMode = false; // Variable to handle editing state
  email: String = localStorage.getItem('email') || '';

  constructor(private router: Router, private authService: AuthService, private companyProfileService: CompanyProfileService) {
    this.company = new CompanyImpl(); // Initialize company with CompanyImpl instance
    this.editedCompany = new CompanyImpl();
  }

  ngOnInit(): void {
    this.loadMyCompany();
  }

  loadMyCompany(): void{
    const observer = {
      next: (response: any) => {
        this.company = response; // Assegna la risposta all'oggetto user
        this.editedCompany = response;
       // this.editedCompany = response;
        console.log(this.company);
      },
      error: (error: any) => {
        console.error('Error loading Company Information', error);
      }
    };
    this.companyProfileService.getCompanyInformation(this.email).subscribe(observer);
  }

  goToCompanyArea(): void {
    this.router.navigate(['/companyArea']); // Navigate to company area
  }

  editProfile() {
    this.editingMode = true;
    console.log(this.editedCompany);
  }

  saveChanges() {
    console.log(this.editedCompany); // Log edited company data
    console.log(this.company);

    const observer = {
      next: (response: any) => {
        this.company = response; // Assegna la risposta all'oggetto user
        // this.editedCompany = response;
        console.log(this.company);
      },
      error: (error: any) => {
        console.error('Error loading Modify Company Information', error);
      }
    };
    this.companyProfileService.updateCompanyInformation(this.editedCompany).subscribe(observer);
    this.editingMode = false;
  }

  cancelEditing() {
    this.editingMode = false; // Cancel editing mode
    this.editedCompany = this.company;
    this.loadMyCompany();
  }

  onKeyDown(event: KeyboardEvent) {
    // Handle keyboard events
  }

  logout(): void {
    this.authService.logout(); // Logout user
  }

  calculateProgress(value: string): string {
    // Supponiamo che la lunghezza massima del campo sia 50
    const maxLength = 50;

    if (value) {
      const length = value.length;
      const progress = (length / maxLength) * 100;
      return progress + '%';
    } else {
      return '0%';
    }
  }
}
