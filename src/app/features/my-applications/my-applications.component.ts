import {Component, OnInit} from '@angular/core';
import { Application } from '../../core/models/application.model';
import {MyApplicationsService} from "./services/my-applications.service";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../shared/components/confirm-dialog/confirm-dialog.component";
import {AlertDialogComponent} from "../../shared/components/alert-dialog/alert-dialog.component";
import {AuthService} from "../../core/services/auth.service";
import {ModifyStatusDialogComponent} from "../../shared/components/modify-status/modify-status.component";
import {UserInformationAppModel} from "../../core/models/userInformationApp.model";
import {Router, RouterLink} from "@angular/router";


type ApplicationField = 'id' | 'status' | 'jobOfferTitle' | 'location' | 'company';


@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    NgIf,
    NgForOf,
    DatePipe,
    RouterLink
  ],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.css'
})
export class MyApplicationsComponent implements OnInit {
  myApplications: Application[] = [];
  currentPage = 0;
  pageSize = 3;
  totalPages = 0;
  searchText = '';
  myFilteredApplications: Application[] = [];
  filterCriteria: ApplicationField = 'jobOfferTitle';
  statusFilter: string = '';
  role: string | undefined;

  constructor(
    private myApplicationsService: MyApplicationsService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken(); // Assuming you have a method to get the token
    this.role = this.authService.getRoleFromToken(token ?? ''); // Get the role from the token
    console.log(this.role);
    this.loadMyApplications();
  }

  loadMyApplications(): void {
    const observer = {
      next: (response: any) => {
        this.myApplications = response.content;
        this.totalPages = response.totalPages;

        if (this.searchText) {
          this.applySearch();
        } else {
          this.myFilteredApplications = this.myApplications;
        }

        this.loadUserInformations()
      },
      error: (error: any) => {
        console.error('Error loading applications: ', error);
      }
    };
    this.myApplicationsService.getMyApplications(this.currentPage, this.pageSize).subscribe(observer);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadMyApplications();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMyApplications();
    }
  }

  clearSearchText(): void {
    this.searchText = '';
    this.applySearch();
  }

  applySearch(): void {
    this.myFilteredApplications = this.myApplications.filter(application =>
      this.getFieldValue(application, this.filterCriteria).toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.statusFilter === '' || application.status.toLowerCase() === this.statusFilter.toLowerCase())
    );
  }

  getFieldValue(application: Application, field: ApplicationField): string {
    switch (field) {
      case 'id':
        return application.id.toString();
      case 'jobOfferTitle':
        return application.jobOffer.title;
      case 'status':
        return application.status;
      case 'location':
        return application.jobOffer.location;
      case 'company':
        return application.jobOffer.company.name;
      default:
        return '';
    }
  }

  deleteApplication(applicationId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Confirmation',
        message: 'Do you want to delete this Application?',
        confirmText: 'Confirm',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.myApplicationsService.deleteApplication(applicationId).subscribe({
          next: response => {
            console.log('Application deleted: ', response);
            this.openSuccessDialog();
            this.loadMyApplications();
          },
          error: error => {
            console.error('Error deleting application: ', error);
          }
        });
      }
    });
  }

  openEditApplicationSuccessDialog(): void{
    this.dialog.open(AlertDialogComponent, {
      data: { title: 'Success', message: 'Edited Application' }
    });
  }


  modifyApplication(applicationId: number, newStatus: string): void {
    this.myApplicationsService.modifyApplication(applicationId, newStatus).subscribe({
      next: (response: Application) =>{
        console.log('Application modified with success: ', response);
        this.openEditApplicationSuccessDialog();
        this.loadMyApplications();
      },
      error: (error: any)=>{
        console.error('Error editing application: ', error);
      }
    })
  }

  openSuccessDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      data: { title: 'Success', message: 'Operation completed successfully' }
    });
  }


  openStatusDialog(application: { status: any; id: number; }): void {
    const dialogRef = this.dialog.open(ModifyStatusDialogComponent, {
      width: '300px',
      data: { currentStatus: application.status },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.modifyApplication(application.id, result);
      }
    });
  }

  loadUserInformations(): void {
    this.myFilteredApplications.forEach(application => {
      this.myApplicationsService.getInformationByUserId(application.idUser).subscribe({
        next: (userInfo: UserInformationAppModel) => {
          application.userInformation = userInfo;
        },
        error: (error: any) => {
          console.error('Error loading user information: ', error);
        }
      });
    });
  }

  navigateToProfile(email: string): void {
    console.log(email);
    let viewCompany = true;
    this.router.navigate(['/profile'], { queryParams: { email, viewCompany} });
  }
}
