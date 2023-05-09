import { Injectable } from '@angular/core';
import { RemoteDataService } from '../data/remote-data.service';
import { Observable, map } from 'rxjs';
import { CompanyModel, PageCompanyModel } from 'src/app/models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private remoteDataService: RemoteDataService) { }

  public getAllCompanies(): Observable<CompanyModel[]> {
    const url = '/company/all';
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  public updateCompany(companyModel: CompanyModel): Observable<CompanyModel> {
    const url = '/company/update/';
    return this.remoteDataService.postData(url, companyModel).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public addCompany(companyModel: CompanyModel): Observable<CompanyModel> {
    const url = '/company/add/';
    return this.remoteDataService.postData(url, companyModel).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public getPageAllCompanies(page: number, size: number): Observable<PageCompanyModel> {
    const url = '/company/allPage/' + page + '&' + size;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public deleteCompany(id: number): Observable<boolean> {
    const url = '/company/delete/' + id;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  public getCompanyById(id: number): Observable<CompanyModel> {
    const url = '/company/id/' + id;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
