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

  getAllMyNotifications(page: number, size: number): Observable<PaginatedResponse<Notification>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Notification>>(endpoints.myNotification, { params });
  }
}
