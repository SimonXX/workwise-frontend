import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../core/models/user.model";
import {endpoints} from "../../../core/constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class CandidateProfileService {

  constructor(private http: HttpClient) {  }

  getMyInformation(email: String): Observable<User>{
    const params = new HttpParams()
      .set('userEmail', email.toString());

    return this.http.get<User>(endpoints.myInformationUser, {params});

  }

  registerUser(userData: any): any{
    const headers = new HttpHeaders().set('skipInterceptor', '');

    return this.http.post(endpoints.registerUser, userData, {headers});
  }

  updateUserInformation(userData: User): Observable<User>{
    return this.http.put<User>(endpoints.modifyUserInformation, userData);
  }
}
