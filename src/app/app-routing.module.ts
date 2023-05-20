import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { MainComponent } from './layouts/main/main.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { UsersComponent } from './layouts/users/users.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { CompanyComponent } from './layouts/company/company.component';
import { UserDetailsComponent } from './layouts/user-details/user-details.component';
import { CompanyDetailsComponent } from './layouts/company-details/company-details.component';
import { InterventionDetailsComponent } from './layouts/intervention-details/intervention-details.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "admin", component: MainComponent, children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "users", component: UsersComponent },
      { path: "user-details/:id", component: UserDetailsComponent },
      { path: "admins", component: AdminComponent },
      { path: "companies", component: CompanyComponent },
      { path: "company-details/:id", component: CompanyDetailsComponent },
      { path: "inter-details/:id", component: InterventionDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
