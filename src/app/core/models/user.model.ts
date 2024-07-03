import {Role} from "./role.model";
import {Credentials} from "./credentials.model";
import {Application} from "./application.model";

export interface User {
  firstName: string
  lastName: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  cv?: ArrayBuffer | null;
  createdDate: Date;
  role: Role;
}
