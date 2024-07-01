import {Component, OnInit} from '@angular/core';
import {Notification} from "../../core/models/notification.model";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NotificationsService} from "./services/notifications.service";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = []; // Array per contenere le notifiche
  currentPage = 0;
  pageSize = 2;
  totalPages = 0;
  searchText = '';

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    // Simulazione di caricamento delle notifiche dal servizio o da una fonte dati
    this.loadNotifications();
  }

  loadNotifications(): void {
    const observer = {
      next:(response: any) =>{
        this.notifications = response.content;
        this.totalPages = response.totalPages;
      },
      error:(error: any) =>{
        console.error('Error loading notifications: ', error);
      }
    }

    this.notificationsService.getAllMyNotifications(this.currentPage, this.pageSize).subscribe(observer);
  }

  markAsRead(notification: Notification): void {
    // Simulazione di marcatura come letta
    notification.isRead = true;
    // Qui potresti voler aggiornare lo stato della notifica nel backend
  }

  clearNotifications(): void {
    // Simulazione di cancellazione delle notifiche
    this.notifications = [];
    // Qui potresti voler chiamare il backend per cancellare tutte le notifiche
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadNotifications();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadNotifications();
    }
  }
}
