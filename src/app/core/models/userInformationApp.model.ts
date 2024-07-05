export interface UserInformationAppModel {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  cvBase64: string;
}

export class UserInformationAppModelImpl implements UserInformationAppModel {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  address: string = '';
  cvBase64: string = '';

  constructor() {
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.phone = '';
    this.address = '';
    this.cvBase64 = '';
  }
}
