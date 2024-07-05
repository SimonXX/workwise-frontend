import {Company, CompanyImpl} from "./company.model";
import {Application} from "./application.model";
import {Role} from "./role.model";

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

export class JobOfferImpl implements JobOffer {
  id: number;
  title: string;
  description: string;
  location: string;
  posteddate: Date;
  expirydate: Date;
  company: Company;
  applications: Application[];

  constructor() {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.location = '';
    this.posteddate = new Date();
    this.expirydate = new Date();
    this.company = new CompanyImpl();
    this.applications = [];
  }
}
