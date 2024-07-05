export interface UserInformationAppModel {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  cvBase64: string;
}

export class UserInformationAppModelImpl implements UserInformationAppModel {
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  address: string = '';
  cvBase64: string = '';

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.phone = '';
    this.address = '';
    this.cvBase64 = '';
  }
}
