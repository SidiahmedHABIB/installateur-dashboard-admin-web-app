import { Injectable } from '@angular/core';
import { RemoteDataService } from '../data/remote-data.service';
import { PageBoxModel } from 'src/app/models/box.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private remoteDataService: RemoteDataService) { }

  public getPageAllBoxesByCompany(companyId: number, page: number, size: number): Observable<PageBoxModel> {
    const url = '/box/pageAll/' + companyId + '&' + page + '&' + size;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
