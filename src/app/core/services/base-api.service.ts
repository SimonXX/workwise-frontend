import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {endpoints, host} from "../constants/endpoints";
import {T} from "@angular/cdk/keycodes";

export class BaseApiService {
  protected baseUrl: string = host;

  constructor(protected http: HttpClient) {}

  protected get<T>(endpoint: string, params?: HttpParams): Observable<T> {

    console.log(params);
    console.log(this.baseUrl + endpoint)
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params });
  }

  protected post<T>(endpoint: string, body: any, p: { observe: string }): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body);
  }

  protected put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body);
  }

  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }
}
