import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {JobOffer} from "../../core/models/job-offer.model";
import {JobOffersService} from "./services/job-offer.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Application} from "../../core/models/application.model";
import {AlertDialogComponent} from "../../shared/components/alert-dialog/alert-dialog.component";
import {ConfirmationDialogComponent} from "../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "../../core/services/auth.service";
import {AddJobOfferDialogComponent} from "../../shared/components/add-job-offer-dialog/add-job-offer-dialog.component";

type JobOfferField = 'id' | 'title' | 'location' | 'company';


@Component({
  selector: 'app-job-offers',
  templateUrl: 'job-offers.component.html',
  standalone: true,
  styleUrls: ['./job-offers.component.css'],
  imports: [
    DatePipe,
    CommonModule,
    FormsModule,
    MatIcon
  ]
})

export class JobOffersComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];
  currentPage = 0;
  pageSize = 3;
  totalPages = 0;
  searchText = '';
  filterCriteria: JobOfferField = 'title';
  role: string | undefined;

  constructor(private jobOffersService: JobOffersService, private dialog: MatDialog, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken(); // Assuming you have a method to get the token
    this.role = this.authService.getRoleFromToken(token ?? ''); // Get the role from the token
    this.loadJobOffers();
  }



  loadJobOffers(): void {
    const observer = {
      next: (response: any) =>{
        this.jobOffers = response.content;
        this.totalPages = response.totalPages;

        if(this.searchText){
          this.applySearch();
        }else{
          this.filteredJobOffers = this.jobOffers;
        }
        console.log(this.jobOffers);
      },
      error: (error: any) =>{
        console.error('Error loading job offers: ', error);
      },
      complete: () => {
        console.log('Job Offers loading process completed');
      }
    }
    this.jobOffersService.getJobOffers(this.currentPage, this.pageSize).subscribe(observer);
  }

  applyJobOffer(jobOfferId: number):void{

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Apply',
        message: 'Do you want to apply to this job offer?',
        confirmText: 'Confirm',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const observer = {
          next: (response: Application) => {
            console.log('Application submitted successfully:', response);
            this.openSuccessDialog();
            this.loadJobOffers();
          },
          error: (error: any) =>{
            console.error('Error applying to job offer:', error);
            if(error.message.toLowerCase().includes('application already exists')){
              console.error('Error applying to job offer:', error);
            }
          },
          complete: () =>{
            console.log('Application process completed');
          }
        };
        this.jobOffersService.applyJobOffer(jobOfferId).subscribe(observer);
      }
    });
  }

  openSuccessDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      data: { title: 'Success', message: 'Application submitted successfully' }
    });
  }

  openAddJobSuccessDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      data: { title: 'Success', message: 'New job offer added' }
    });
  }

  openEditJobSuccessiDialog(): void{
    this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Success', message: 'Job Offer modified'
      }
    })
  }

  openDeletedJobSuccessDialog(): void{
    this.dialog.open(AlertDialogComponent, {
      data: { title: 'Success', message: 'Deleted Job Offer' }
    });
  }


  applySearch(): void {
    this.filteredJobOffers = this.jobOffers.filter(jobOffer =>
      this.getFieldValue(jobOffer, this.filterCriteria).toLowerCase().includes(this.searchText.toLowerCase())
    );
  }



  getFieldValue(jobOffer: JobOffer, field: JobOfferField): string {
    switch (field) {
      case 'id':
        return jobOffer.id.toString();
      case 'title':
        return jobOffer.title;
      case 'location':
        return jobOffer.location;
      case 'company':
        return jobOffer.company.name; // Assuming company has a name field
      default:
        return '';
    }
  }

  clearSearchText(): void {
    this.searchText = '';
    this.applySearch();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadJobOffers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadJobOffers();
    }
  }



  deleteJobOffer(jobOfferId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Do you want to delete this job offer?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const observer = {
          next: (response: any) => {
            console.log('Job offer deleted successfully:', response);
            this.openDeletedJobSuccessDialog();
            this.loadJobOffers();
          },
          error: (error: any) => {
            console.error('Error deleting job offer:', error);
          },
          complete: () => {
            console.log('Delete job offer process completed');
          }
        };
        this.jobOffersService.deleteJobOffer(jobOfferId).subscribe(observer);
      }
    });
  }

  addJobOffers(newJobOffer: JobOffer): void {

      console.log(newJobOffer.expirydate);
        this.jobOffersService.addJobOffer(newJobOffer).subscribe({
          next: (response: JobOffer) => {
            console.log('Job offer added successfully:', response);
            this.openAddJobSuccessDialog();
            this.loadJobOffers();
          },
          error: (error: any) => {
            console.error('Error adding job offer:', error);
          }
        });
  }

  openAddJobOfferDialog(): void {

    const dialogRef = this.dialog.open(AddJobOfferDialogComponent, {
      width: '600px', // Imposta la larghezza del dialogo come preferisci
      data: {
        mode: 'add' // Indica che stai modificando un'offerta di lavoro esistente
      }// Eventuali dati da passare al dialogo, se necessario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Gestione della chiusura del dialogo e dei dati restituiti
      if (result) {
        this.addJobOffers(result); // Chiamata alla funzione addJobOffers con i dati restituiti dal dialogo
      }
    });
  }

  editJobOffers(newJobOffer: JobOffer, jobOfferId: number): void {

    newJobOffer.id = jobOfferId;

    console.log(newJobOffer);
    this.jobOffersService.modifyJobOffer(newJobOffer).subscribe({
      next: (response: JobOffer) => {
        console.log('Job offer modified successfully:', response);
        this.openEditJobSuccessiDialog();
        this.loadJobOffers();
      },
      error: (error: any) => {
        console.error('Error adding job offer:', error);
      }
    });
  }


  openEditJobOffer(jobOfferId: number): void {
    // Trova l'offerta di lavoro esistente in base all'ID
    const existingJobOffer = this.jobOffers.find(offer => offer.id === jobOfferId);

    // Apri il dialogo e passa i dati esistenti dell'offerta di lavoro
    const dialogRef = this.dialog.open(AddJobOfferDialogComponent, {
      width: '600px', // Imposta la larghezza del dialogo come preferisci
      data: {
        mode: 'edit', // Indica che stai modificando un'offerta di lavoro esistente
        jobOffer: existingJobOffer // Passa i dati dell'offerta di lavoro esistente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Gestione della chiusura del dialogo e dei dati restituiti
      if (result) {
        this.editJobOffers(result, jobOfferId); // Chiamata alla funzione editJobOffers con i dati restituiti dal dialogo
      }
    });
  }
}
