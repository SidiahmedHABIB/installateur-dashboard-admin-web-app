import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteDataService {

  private BASEURL: string = "http://localhost:8081"

  constructor(private httpClient: HttpClient) { }
  public getData(url: string): Observable<any> {
    return this.httpClient.get<any>(this.BASEURL + url);
  }
  public postData(url: String, body: any): Observable<any> {
    return this.httpClient.post<any>(this.BASEURL + url, body);
  }
  public putData(url: String, body: any): Observable<any> {
    return this.httpClient.put<any>(this.BASEURL + url, body);
  }
}
