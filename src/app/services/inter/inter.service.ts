import { Injectable } from '@angular/core';
import { RemoteDataService } from '../data/remote-data.service';
import { Observable, map } from 'rxjs';
import { InterModel, PageInterModel } from 'src/app/models/inter.model';

@Injectable({
  providedIn: 'root'
})
export class InterService {

  constructor(private remoteDataService: RemoteDataService) { }

  public getPageHaveIntersByUser(uId: number, page: number, size: number): Observable<PageInterModel> {
    const url = '/inter/pageInterByUser/' + uId + '&' + page + '&' + size;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  public getPageHaveIntersByCompany(companyId: number, page: number, size: number): Observable<PageInterModel> {
    const url = '/inter/pageInterByCompany/' + companyId + '&' + page + '&' + size;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  public plannedIntervention(interModel: InterModel): Observable<InterModel> {
    const url = '/inter/plannedIntervention/';
    return this.remoteDataService.postData(url, interModel).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  public updateIntervention(inter: InterModel, id: number): Observable<InterModel> {
    const url = '/inter/update/' + id;
    return this.remoteDataService.putData(url, inter).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public addIntervention(inter: InterModel, id: number): Observable<InterModel> {
    const url = '/inter/add/' + id;
    return this.remoteDataService.putData(url, inter).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  public deleteIntervention(id: number): Observable<boolean> {
    const url = '/inter/delete/' + id;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
