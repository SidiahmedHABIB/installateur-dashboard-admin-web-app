import { Injectable } from '@angular/core';
import { RemoteDataService } from '../data/remote-data.service';
import { BoxModel, PageBoxModel } from 'src/app/models/box.model';
import { Observable, map } from 'rxjs';
import { PageImageModel } from 'src/app/models/image.model';

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

  public updateBox(box: BoxModel, id: number): Observable<BoxModel> {
    const url = '/box/update/' + id;
    return this.remoteDataService.putData(url, box).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public addBox(boxModel: BoxModel, id: number): Observable<BoxModel> {
    const url = '/box/add/' + id;
    return this.remoteDataService.putData(url, boxModel).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  public deleteBox(id: number): Observable<boolean> {
    const url = '/box/delete/' + id;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  public getBoxImages(id: number): Observable<PageImageModel> {
    const url = '/box/boxImages/' + id;
    return this.remoteDataService.getData(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
