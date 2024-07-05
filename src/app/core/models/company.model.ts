import {Role} from "./role.model";

export interface Company {
  id: number;
  name: string;
  phone: string;
  address: string;
  website: string;
  description: string;
  createdDate: Date;
  role: Role;
}

export class CompanyImpl implements Company {
  id: number;
  name: string;
  phone: string;
  address: string;
  website: string;
  description: string;
  createdDate: Date;
  role: Role;

  constructor() {
    this.id = 0;
    this.name = '';
    this.phone = '';
    this.address = '';
    this.website = '';
    this.description = '';
    this.createdDate = new Date();
    this.role = {
      id: 0,
      name: ''
    };
  }
}
