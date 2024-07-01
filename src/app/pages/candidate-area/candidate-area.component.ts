import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {JobOffersComponent} from "../../features/job-offers/job-offers.component";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-candidate-area',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    JobOffersComponent
  ],
  templateUrl: './candidate-area.component.html',
  styleUrl: './candidate-area.component.css'
})
export class CandidateAreaComponent implements OnInit{

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}

