import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {JobOffer} from "../../core/models/job-offer.model";
import {JobOffersService} from "./services/job-offer.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Application} from "../../core/models/application.model";
import {AlertDialogComponent} from "../../shared/components/alert-dialog/alert-dialog.component";

type JobOfferField = 'id' | 'title' | 'location' | 'company';


@Component({
  selector: 'app-job-offers',
  templateUrl: 'job-offers.component.html',
  standalone: true,
  styleUrls: ['./job-offers.component.css'],
  imports: [
    DatePipe,
    CommonModule,
    FormsModule]
})

export class JobOffersComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];
  currentPage = 0;
  pageSize = 3;
  totalPages = 0;
  searchText = '';
  filterCriteria: JobOfferField = 'title';

  constructor(private jobOffersService: JobOffersService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
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
    const observer = {
      next: (response: Application) => {
        console.log('Application submitted successfully:', response);
        this.openSuccessDialog();
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

  openSuccessDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      data: { message: 'Application submitted successfully' }
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
}
