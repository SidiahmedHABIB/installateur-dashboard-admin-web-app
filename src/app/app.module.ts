import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layouts/main/main.component';
import { LoginComponent } from './layouts/login/login.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { UsersComponent } from './layouts/users/users.component';
import { CompanyComponent } from './layouts/company/company.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { UserDetailsComponent } from './layouts/user-details/user-details.component';
import { CompanyDetailsComponent } from './layouts/company-details/company-details.component';
import { InterventionComponent } from './layouts/intervention/intervention.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    CompanyComponent,
    AdminComponent,
    UserDetailsComponent,
    CompanyDetailsComponent,
    InterventionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
