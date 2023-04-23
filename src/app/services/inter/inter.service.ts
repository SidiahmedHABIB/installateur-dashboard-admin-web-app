import { Injectable } from '@angular/core';
import { RemoteDataService } from '../data/remote-data.service';
import { Observable, map } from 'rxjs';
import { InterModel, PageInterModel } from 'src/app/models/inter.model';

@Injectable({
  providedIn: 'root'
})
export class InterService {

  constructor(private remoteDataService: RemoteDataService) { }

  public getPageHaveUserInters(uId: number, page: number, size: number): Observable<PageInterModel> {
    const url = '/inter/pageInterByUser/' + uId + '&' + page + '&' + size;
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
}
