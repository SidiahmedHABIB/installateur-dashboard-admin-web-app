import { Injectable } from '@angular/core';
import { RemoteDataService } from '../data/remote-data.service';
import { Observable, map } from 'rxjs';
import { PageCompanyModel } from 'src/app/models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private remoteDataService: RemoteDataService) { }

  public getPageAllCompanies(page: number, size: number): Observable<PageCompanyModel> {
    const url = '/company/allPage/' + page + '&' + size;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
