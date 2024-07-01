import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterCandidateComponent} from "./pages/register-candidate/register-candidate.component";
import {RegisterCompanyComponent} from "./pages/register-company/register-company.component";
import {CandidateAreaComponent} from "./pages/candidate-area/candidate-area.component";
import {CompanyAreaComponent} from "./pages/company-area/company-area.component";
import {JobOffersComponent} from "./features/job-offers/job-offers.component";
import {NgModule} from "@angular/core";
import {companyGuard} from "./core/guards/company.guard";
import {candidateGuard} from "./core/guards/candidate.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register-as-a-candidate',
    component: RegisterCandidateComponent,

  },
  {
    path: 'register-as-a-company',
    component: RegisterCompanyComponent,
  },
  {
    path: 'candidateArea',
    component: CandidateAreaComponent,
    canActivate: [candidateGuard]
  },
  {
    path: 'companyArea',
    component: CompanyAreaComponent,
    canActivate: [companyGuard]
  },
  {
    path: 'jobOffers',
    component: JobOffersComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
