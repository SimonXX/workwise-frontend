export const host = 'http://localhost:8080/api';

export const endpoints = {

  login: host + '/auth/login',
  refresh: host + '/auth/refresh',
  companyPage: host + '/auth/register/company',
  candidatePage: host + '/auth/register/user',

  jobOffers: host + '/joboffers',

  availableJobOffers : host + '/joboffers/availablesJobOffers',

  applications: host + 'applications',

  addApplications: host + '/applications/addApplication',

  myNotification: host + '/notifications/myNotifications',

  markAsReadNotification: host + '/notifications/markAsRead',

  markAsUnreadNotification: host + '/notifications/markAsUnread',

  deleteNotification: host + '/notifications/deleteNotification',

  deleteAllNotifications: host + '/notifications/deleteAllNotifications',

  myApplications: host + '/applications/myApplications',

  deleteApplication: host + '/applications/deleteApplication',

  myInformationUser : host + '/users/email',

  companyInformation: host + '/companies/email',

  deleteJobOffer: host + '/joboffers/deleteJobOffer',

  addJobOffer: host + '/joboffers/addJobOffer',

  modifyJobOffer: host + '/joboffers/modifyJobOffer',

  modifyApplication: host + '/applications/modifyApplication',

  modifyCompanyInformation: host + '/companies/change',

  modifyUserInformation: host + '/users/change',

  registerUser: host + '/auth/register/user',

  registerCompany: host + '/auth/register/company',

  getInformationUser: host + '/users/information',

  getInformationUserById: host + '/users/information/id'

};

