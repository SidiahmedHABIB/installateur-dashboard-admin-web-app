import { Injectable } from '@angular/core';
import { RemoteDataService } from '../data/remote-data.service';
import { AdminModel, PageAdminModel } from 'src/app/models/admin.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private remoteDataService: RemoteDataService) { }
  public getPageAdmins(page: number, size: number): Observable<PageAdminModel> {
    const url = '/admin/all/' + page + '&' + size;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public updateAdmin(adminModel: AdminModel): Observable<AdminModel> {
    const url = '/admin/update/';
    return this.remoteDataService.postData(url, adminModel).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public addAdmin(adminModel: AdminModel): Observable<AdminModel> {
    const url = '/admin/add/';
    return this.remoteDataService.postData(url, adminModel).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public deleteAdmin(id: number): Observable<boolean> {
    const url = '/admin/delete/' + id;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
