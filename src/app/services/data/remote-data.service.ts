import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class RemoteDataService {

  private BASEURL: string = "http://localhost:8081"
  tokens!: TokenResponse;


  constructor(private httpClient: HttpClient) { }



  withPassword(email: string, password: string): Observable<TokenResponse> {
    const grantType = 'password';
    const withRefreshToken = 'true';
    const refreshToken = '';
    const formData = new FormData();
    formData.append('grantType', grantType);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('withRefreshToken', withRefreshToken);
    console.log(formData);
    return this.httpClient.post<any>(`${this.BASEURL}/token`, formData);
  }

  withRefreshToken(refreshToken: string): Observable<any> {
    const grantType = 'refreshToken';
    const withRefreshToken = 'true';
    const formData = new FormData();
    formData.append('grantType', grantType);
    formData.append('email', '');
    formData.append('password', '');
    formData.append('withRefreshToken', withRefreshToken);
    formData.append('refreshToken', refreshToken);
    return this.httpClient.post<any>(`${this.BASEURL}/token`, formData);
  }

  public getData(url: string): Observable<any> {
    let headers = new HttpHeaders();
    this.withPassword("admin1@gmail.com", "1234").subscribe({
      next: (data: TokenResponse) => {
        this.tokens = data;
        headers = headers.set('Authorization', 'Bearer ' + data.accessToken);
        console.log(data)
        return this.httpClient.get<any>(this.BASEURL + url, { headers });
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)

      }
    })
    headers = headers.set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhdXRoLXNlcnZpY2UiLCJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwiZXhwIjoxNjgzNDY0MTY2LCJpYXQiOjE2ODM0NjM4NjYsInNjb3BlIjoiQURNSU4gVVNFUiJ9.I0USDw9r4LaDgmfWCyHsXheNQ4zkh4i1zjMp3PHUo4C2VXuO5oeoUIfT6HxRh--LQZQVVeR44snKj-1o0qlXxwxY6JDfDbVPQTwdkFACtAAJ1QuML5RrlSH5PVJxpX0fm7-mJU4S6A4sYOrgZsiiLL-UeqpYc3h6e1qAow5m9ZeAShKdb7UpTPNlGAz2EQlvM4Zmoa-zhusaB-6it_SB8vRJbSGweS3YkPXMEMDtNvfW_SXWBlrHTM4ygJaC5xYEvZPGAsFNilV2TGljpvfhtlg-wVQyq6UIcRUhdNX_gC6mkRTOhC10VyoDUkP4ThgvorA98lJBTv06wH0yEvuyIA');
    return this.httpClient.get<any>(this.BASEURL + url);
  }

  public postData(url: string, body: any): Observable<any> {
    let headers = new HttpHeaders();
    this.withPassword("admin1@gmail.com", "1234").subscribe({
      next: (data: TokenResponse) => {
        this.tokens = data;
        headers = headers.set('Authorization', 'Bearer ' + this.tokens.accessToken);
        console.log(data)
        console.log(headers)
        return this.httpClient.post<any>(this.BASEURL + url, body, { headers });
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)

      }
    })
    //headers = new HttpHeaders({ 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhdXRoLXNlcnZpY2UiLCJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwiZXhwIjoxNjgzNDY0NjM4LCJpYXQiOjE2ODM0NjQzMzgsInNjb3BlIjoiQURNSU4gVVNFUiJ9.vc-iFqoIeIHNzQPgboH18te23LtR_gL35MkEA1Hog2CUkHtbxAZIqiDGZ54j4y4oadtERv9qwS7KlTq8e4jpskofxXR0jEMyY3zgqh1S3BJrN-aryQsj_hNiRy7KLcERcoRfeoJJPFoFDHBLhC6IoKrCZL69gsBG3aSiM3tU_HTZVSH1gU-5yakzO_-v0QqL0h6uSHQwLpuwyWPw91puFEuqLmRnMxbdJEM40JLeyr6nM8Zi-fl67qY7oU84UkW0ODDa4NlWb-g4m4dtD7DMxDU1BtUfJ1bq41-WG7sR9KK3_2h4hLMsDiJURfvt6RyIsSwj4aODc3yHBbgIin0Hag' },);
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhdXRoLXNlcnZpY2UiLCJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwiZXhwIjoxNjgzNDY0NjM4LCJpYXQiOjE2ODM0NjQzMzgsInNjb3BlIjoiQURNSU4gVVNFUiJ9.vc-iFqoIeIHNzQPgboH18te23LtR_gL35MkEA1Hog2CUkHtbxAZIqiDGZ54j4y4oadtERv9qwS7KlTq8e4jpskofxXR0jEMyY3zgqh1S3BJrN-aryQsj_hNiRy7KLcERcoRfeoJJPFoFDHBLhC6IoKrCZL69gsBG3aSiM3tU_HTZVSH1gU-5yakzO_-v0QqL0h6uSHQwLpuwyWPw91puFEuqLmRnMxbdJEM40JLeyr6nM8Zi-fl67qY7oU84UkW0ODDa4NlWb-g4m4dtD7DMxDU1BtUfJ1bq41-WG7sR9KK3_2h4hLMsDiJURfvt6RyIsSwj4aODc3yHBbgIin0Hag'
    // });

    return this.httpClient.post<any>(this.BASEURL + url, body, { headers });
  }

  public putData(url: string, body: any): Observable<any> {
    let headers = new HttpHeaders();
    return this.httpClient.put<any>(this.BASEURL + url, body, { headers });
  }

  public async postRequest(url: string, body: any): Promise<any> {
    try {
      const data: TokenResponse = await this.withPassword("admin1@gmail.com", "1234").toPromise() as TokenResponse;
      if (!data) {
        throw new Error('Failed to retrieve access token');
      }
      this.tokens = data;
      //headers = headers.set('Authorization', 'Bearer ' + this.tokens.accessToken);
      const access = 'Bearer ' + this.tokens.accessToken;
      console.log("access: " + access);
      console.log(data);
      const headers = new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': access
      });
      return this.httpClient.post<any>(this.BASEURL + url, body, { headers }).toPromise();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
      throw error;
    }
  }



}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

