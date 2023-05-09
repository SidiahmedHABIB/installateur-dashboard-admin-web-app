import { Injectable } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { AdminModel } from 'src/app/models/admin.model';
import { RemoteDataService } from '../data/remote-data.service';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { LoginRequest, LoginResponse } from 'src/app/models/login.model';

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
    const user: LoginRequest = { email, password };
    const url = `/admin/login/`;
    return from(this.remoteDataService.postRequest(url, user)).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public authenticateAdmin(appAdmin: AdminModel): Observable<boolean> {
    this.authenticatedAdmin = appAdmin;
    localStorage.setItem("authAdim", JSON.stringify({ username: appAdmin.firstName + " " + appAdmin.lastName, email: appAdmin.email, password: appAdmin.password }));
    return of(true);
  }

  public isAuthenticated() {
    return this.authenticatedAdmin != undefined;
  }

  public logout(): Observable<boolean> {
    this.authenticatedAdmin = undefined;
    localStorage.removeItem("authAdim");
    return of(true);
  }
}
