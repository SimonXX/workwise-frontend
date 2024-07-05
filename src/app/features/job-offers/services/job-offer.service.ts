import {Injectable} from "@angular/core";
import {BaseApiService} from "../../../core/services/base-api.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PaginatedResponse} from "../../../core/models/paginated-response.model";
import {Observable} from "rxjs";
import {endpoints} from "../../../core/constants/endpoints";
import {JobOffer} from "../../../core/models/job-offer.model";
import {Application} from "../../../core/models/application.model";

@Injectable({
  providedIn: 'root'
})
export class JobOffersService {

  constructor(private http: HttpClient) { }

  //usato sia da user che da company
  getJobOffers(page: number, size: number): Observable<PaginatedResponse<JobOffer>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<JobOffer>>(endpoints.availableJobOffers, { params });
  }

  applyJobOffer(jobOfferId: number): Observable<Application> {
    const body = {
      jobOffer: jobOfferId
    };

    return this.http.post<Application>(endpoints.addApplications, body);
  }

  deleteJobOffer(jobOfferId: number): Observable<any> {
    const url =`${endpoints.deleteJobOffer}/${jobOfferId}`;
    return this.http.delete(url);
  }

  addJobOffer(jobOffer: JobOffer): Observable<JobOffer>{
    return this.http.post<JobOffer>(endpoints.addJobOffer, jobOffer);
  }

  modifyJobOffer(jobOffer: JobOffer): Observable<JobOffer>{
    return this.http.put<JobOffer>(endpoints.modifyJobOffer, jobOffer);
  }
}
