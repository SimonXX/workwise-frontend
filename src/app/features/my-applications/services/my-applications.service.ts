import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedResponse} from "../../../core/models/paginated-response.model";
import {Application} from "../../../core/models/application.model";
import {endpoints} from "../../../core/constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class MyApplicationsService {

  constructor(private http: HttpClient) { }

  getMyApplications(page: number, size: number): Observable<PaginatedResponse<Application>>{
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

    return this.http.get<PaginatedResponse<Application>>(endpoints.myApplications, { params });
}

  deleteApplication(applicationId: number): Observable<any>{
    const url = `${endpoints.deleteApplication}/${applicationId}`;
    return this.http.delete(url);
  }
}
