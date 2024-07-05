import {Role} from "./role.model";


export interface User {
  firstName: string
  lastName: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  createdDate: Date;
  cvBase64: string;
  role: Role;
}

export class UserImpl implements User {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  createdDate: Date;
  cvBase64: string;
  role: Role;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.phone = '';
    this.address = '';
    this.dateOfBirth = new Date();
    this.createdDate = new Date();
    this.cvBase64 = '';
    this.role = {
      id: 0,
      name: ''
    };
  }
}
