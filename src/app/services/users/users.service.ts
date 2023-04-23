import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PageUsersModel, UserModel } from 'src/app/models/user.model';
import { RemoteDataService } from '../data/remote-data.service';
import { PageInterModel } from 'src/app/models/inter.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private remoteDataService: RemoteDataService) { }

  public getPageUsers(page: number, size: number): Observable<PageUsersModel> {
    const url = '/users/all/' + page + '&' + size;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public updateUser(userModel: UserModel): Observable<UserModel> {
    const url = '/users/updateUser/';
    return this.remoteDataService.postData(url, userModel).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public addUser(userModel: UserModel): Observable<UserModel> {
    const url = '/users/add/';
    return this.remoteDataService.postData(url, userModel).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public deleteUser(id: number): Observable<boolean> {
    const url = '/users/delete/' + id;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
