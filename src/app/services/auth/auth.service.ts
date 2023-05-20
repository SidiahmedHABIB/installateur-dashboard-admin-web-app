import { Injectable } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { AdminModel } from 'src/app/models/admin.model';
import { RemoteDataService } from '../data/remote-data.service';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'src/app/models/login.model';
import { Constants } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL: string = "/admin/login/";



  authenticatedAdmin: AdminModel | undefined;
  constructor(private httpClient: HttpClient, private remoteDataService: RemoteDataService) { }

  public getAllAdmins(): Observable<AdminModel[]> {
    const url = '/admin';
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    const url = `/auth/admin/`;
    return from(this.remoteDataService.postLogin(url, email, password)).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public authenticateAdmin(appAdmin: LoginResponse): Observable<boolean> {
    this.authenticatedAdmin = appAdmin.data;
    localStorage.setItem(Constants.authAdim, JSON.stringify({ username: appAdmin.data.firstName + " " + appAdmin.data.lastName, email: appAdmin.data.email, password: appAdmin.data.password }));
    localStorage.setItem(Constants.accessToken, appAdmin.tokens.accessToken);
    localStorage.setItem(Constants.refreshToken, appAdmin.tokens.refreshToken);
    return of(true);
  }

  public isAuthenticated() {
    return this.authenticatedAdmin != undefined;
  }

  public logout(): Observable<boolean> {
    this.authenticatedAdmin = undefined;
    localStorage.removeItem(Constants.authAdim);
    return of(true);
  }
}
