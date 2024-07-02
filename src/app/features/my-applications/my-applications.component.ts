import {Component, OnInit} from '@angular/core';
import { Application } from '../../core/models/application.model';
import {MyApplicationsService} from "./services/my-applications.service";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgForOf, NgIf} from "@angular/common";


type ApplicationField = 'id' | 'status' | 'Job Offer Title';


@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.css'
})
export class MyApplicationsComponent implements OnInit{

  myApplications: Application[] = [];
  currentPage = 0;
  pageSize = 3;
  totalPages = 0;
  searchText = '';
  myFilteredApplications: Application[] = [];
  filterCriteria: ApplicationField = 'Job Offer Title';
  statusFilter: string = '';

  constructor(private myApplicationsService: MyApplicationsService ) {
  }

  ngOnInit(): void {

    this.loadMyApplications();
  }

  loadMyApplications(): void{
    const observer = {
      next: (response: any) =>{
        this.myApplications = response.content;
        this.totalPages = response.totalPages;

        if(this.searchText){
          this.applySearch();
        }else{
          this.myFilteredApplications= this.myApplications;
        }

      },
      error: (error: any) =>{
        console.error('Error loading job offers: ', error);
      }
    }
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
      case 'Job Offer Title':
        return application.jobOffer.title;
      case 'status':
        return application.status;
      default:
        return '';
    }
  }
}
