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

