import { Component } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {JobOffersComponent} from "../../features/job-offers/job-offers.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MyApplicationsComponent} from "../../features/my-applications/my-applications.component";
import {NgClass, NgIf} from "@angular/common";
import {NotificationsComponent} from "../../features/notifications/notifications.component";

@Component({
  selector: 'app-company-area',
  standalone: true,
  imports: [
    JobOffersComponent,
    MatIcon,
    MatIconButton,
    MyApplicationsComponent,
    NgIf,
    NotificationsComponent,
    NgClass
  ],
  templateUrl: './company-area.component.html',
  styleUrl: './company-area.component.css'
})
export class CompanyAreaComponent {

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
