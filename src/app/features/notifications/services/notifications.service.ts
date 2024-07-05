import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedResponse} from "../../../core/models/paginated-response.model";
import {endpoints} from "../../../core/constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {}

  //usato sia da user che da company
  getAllMyNotifications(page: number, size: number): Observable<PaginatedResponse<Notification>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Notification>>(endpoints.myNotification, { params });
  }

  //usato sia da user che da company
  markAsRead(notificationId: number): Observable<any> {
    const url = `${endpoints.markAsReadNotification}/${notificationId}`; // Esempio di URL per segnare la notifica come letta
    return this.http.put(url, null); // L'endpoint PUT richiede un body, anche se è null
  }

  //usato sia da user che da company
  markUsUnread(notificationId: number): Observable<any>{
    const url = `${endpoints.markAsUnreadNotification}/${notificationId}`;
    return this.http.put(url, null);
  }

  //usato sia da user che da company
  deleteNotification(notificationId: number): Observable<any>{
    const url = `${endpoints.deleteNotification}/${notificationId}`;
    return this.http.delete(url);
  }

  //usato sia da user che da company
  deleteAllNotifications(): Observable<any>{
    const url = `${endpoints.deleteAllNotifications}`;
    return this.http.delete(url);
  }
}
