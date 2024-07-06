import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedResponse} from "../../../core/models/paginated-response.model";
import {Application} from "../../../core/models/application.model";
import {endpoints} from "../../../core/constants/endpoints";
import {H} from "@angular/cdk/keycodes";
import {UserInformationAppModel} from "../../../core/models/userInformationApp.model";

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


  modifyApplication(applicationId: number, newStatus: string): Observable<any> {
    const body = {
      idApplication: applicationId,
      newStatus: newStatus
    };

    return this.http.put<Application>(endpoints.modifyApplication, body);
  }

  getInformationByUserEmail(userEmail: string): Observable<UserInformationAppModel> {
    const params = new HttpParams().set('userEmail', userEmail);

    return this.http.get<UserInformationAppModel>(endpoints.getInformationUser, { params });
  }

  getInformationByUserId(userId: number): Observable<UserInformationAppModel> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<UserInformationAppModel>(endpoints.getInformationUserById, { params });
  }
}
