import {JobOffer, JobOfferImpl} from "./job-offer.model";
import {UserInformationAppModel, UserInformationAppModelImpl} from "./userInformationApp.model";

export interface Application {
  id: number;
  idUser: number;
  applicationDate: Date;
  status: string;
  jobOffer: JobOffer;
  userInformation: UserInformationAppModel; // Aggiungi questo campo opzionale
}

export class ApplicationImpl implements Application {
  id: number;
  idUser: number;
  applicationDate: Date;
  status: string;
  jobOffer: JobOffer;
  userInformation: UserInformationAppModel; // Aggiungi questo campo opzionale

  constructor() {
    this.id = 0; // Inizializza con 0
    this.idUser = 2; // Lascia 2 come valore predefinito
    this.applicationDate = new Date(); // Inizializza con la data corrente
    this.status = ''; // Stringa vuota come valore predefinito
    this.jobOffer = new JobOfferImpl(); // Inizializza con un oggetto JobOffer vuoto
    this.userInformation = new UserInformationAppModelImpl();
  }
}
