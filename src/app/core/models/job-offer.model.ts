import {Company} from "./company.model";
import {Application} from "./application.model";

export interface JobOffer {
  id: number;
  title: string;
  description: string;
  location: string;
  posteddate: Date;
  expirydate: Date;
  company: Company;
  applications: Application[];
}
