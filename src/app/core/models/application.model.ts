import {JobOffer} from "./job-offer.model";

export interface Application {
  id: number;
  idUser: 2;
  applicationDate: Date;
  status: string;
  jobOffer: JobOffer;
}
