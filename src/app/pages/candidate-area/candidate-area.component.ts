import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgOptimizedImage} from "@angular/common";
import {JobOffersComponent} from "../../features/job-offers/job-offers.component";
import {AuthService} from "../../core/services/auth.service";
import {NotificationsComponent} from "../../features/notifications/notifications.component";
import {MatSidenavContainer} from "@angular/material/sidenav";
import {SidenavComponent} from "../../shared/components/sidenav/sidenav.component";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MyApplicationsComponent} from "../../features/my-applications/my-applications.component";

@Component({
  selector: 'app-candidate-area',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    JobOffersComponent,
    NotificationsComponent,
    MatSidenavContainer,
    SidenavComponent,
    MatIconButton,
    MatIcon,
    MyApplicationsComponent,
    NgOptimizedImage
  ],
  templateUrl: './candidate-area.component.html',
  styleUrl: './candidate-area.component.css'
})
export class CandidateAreaComponent implements OnInit{
  activePanel: 'jobOffers' | 'myApplications' = 'jobOffers'; // Default to show job offers

  name = localStorage.getItem('email');
  constructor(private authService: AuthService) {
  }

  showNotifications = true;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
  togglePanel(panel: 'jobOffers' | 'myApplications'): void {
    this.activePanel = panel;
  }
}

