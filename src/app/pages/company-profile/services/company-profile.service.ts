import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../../../core/models/company.model";
import {endpoints} from "../../../core/constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {


  private apiUrl = 'http://your-api-url.com/api'; // Sostituisci con l'URL del tuo API

  constructor(private http: HttpClient) { }

  registerCompany(companyData: any): Observable<any> {
    const headers = new HttpHeaders().set('skipInterceptor', '');

    return this.http.post(endpoints.registerCompany, companyData, {headers});
  }


  getCompanyInformation(email: String): Observable<Company> {
    const params = new HttpParams().set("companyEmail", email.toString());

    return this.http.get<Company>(endpoints.companyInformation, {params});
  }

  updateCompanyInformation(companyData: Company): Observable<Company> {
    return this.http.put<Company>(endpoints.modifyCompanyInformation, companyData);
  }
}
