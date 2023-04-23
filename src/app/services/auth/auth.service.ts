import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AdminModel } from 'src/app/models/admin.model';
import { RemoteDataService } from '../data/remote-data.service';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL: string = "/admin/login/";


  private BASEURL: string = "http://192.168.1.15:8081/"

  authenticatedAdmin: AdminModel | undefined;
  constructor(private httpClient: HttpClient, private remoteDataService: RemoteDataService) { }

  public getAllAdmins(): Observable<AdminModel[]> {
    return this.httpClient.get<AdminModel[]>(this.BASEURL + 'admin');
  }

  public login(email: string, password: string): Observable<UserModel> {
    const url = `${this.LOGIN_URL}${email}&${password}`;
    return this.remoteDataService.getData(url).pipe(
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
