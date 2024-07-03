import {Component, OnInit} from '@angular/core';
import {Notification} from "../../core/models/notification.model";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NotificationsService} from "./services/notifications.service";
import {ConfirmationDialogService} from "../../shared/components/confirm-dialog/service/confirmation-dialog.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../shared/components/confirm-dialog/confirm-dialog.component";
import {AlertDialogComponent} from "../../shared/components/alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = []; // Array per contenere le notifiche
  currentPage = 0;
  pageSize = 3;
  totalPages = 0;
  searchText = '';

  constructor(private notificationsService: NotificationsService,  private dialog: MatDialog) { }

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

  markAsRead(notificationId: number): void {
    this.notificationsService.markAsRead(notificationId).subscribe({
      next: response => {
        console.log('Notification marked as read:', response);
        this.loadNotifications();
      },
      error: error => {
        console.error('Error marking notification as read:', error);
      }
    });
  }

  markAsUnread(notificationId: number): void{
    this.notificationsService.markUsUnread(notificationId).subscribe({
      next: response =>{
        console.log('Notification marked as unread: ', response);
        this.loadNotifications();
      },
      error: error =>{
        console.error('Error marking notification as unread: ', error);
      }
    })
  }

  deleteNotification(notificationId: number): void{
    this.notificationsService.deleteNotification(notificationId).subscribe({
      next: response =>{
        console.log('Notification deleted: ', response);
        this.loadNotifications();
      },
      error: error =>{
        console.error('Error to delete notification: ', error);
      }
    })
  }

  clearNotifications(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Confirmation',
        message: 'Do you want to delete all notifications?',
        confirmText: 'Confirm',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationsService.deleteAllNotifications().subscribe({
          next: response => {
            console.log('All Notifications deleted: ', response);
            this.openSuccessDialog()
            this.loadNotifications();
          },
          error: error => {
            console.error('Error to delete all notifications: ', error);
          }
        });
      }
    });
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

  openSuccessDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      data: { title: 'Success', message: 'Notifications deleted successfully' }
    });
  }
}
