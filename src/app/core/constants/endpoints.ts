export const host = 'http://localhost:8080/api';

export const endpoints = {

  login: host + '/auth/login',
  refresh: host + '/auth/refresh',
  companyPage: host + '/auth/register/company',
  candidatePage: host + '/auth/register/user',

  jobOffers: host + '/joboffers',

  availableJobOffers : host + '/joboffers/availablesJobOffers',

  applications: host + 'applications',

  addApplications: host + '/applications/addApplication'
};

