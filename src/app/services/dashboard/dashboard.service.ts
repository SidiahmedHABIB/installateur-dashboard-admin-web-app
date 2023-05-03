import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // private stompClient: Stomp.Client;

  constructor() { }

  // public connect(): Observable<number> {
  //   const socket = new SockJS('http://localhost:8080/websocket');
  //   this.stompClient = Stomp.over(socket);
  //   this.stompClient.debug = null;
  //   const observable = new Observable<number>(observer => {
  //     this.stompClient.connect({}, () => {
  //       this.stompClient.subscribe('/topic/random', (message) => {
  //         observer.next(Number(message.body));
  //       });
  //     });
  //   });
  //   return observable;
  // }

  // public disconnect(): void {
  //   if (this.stompClient !== null) {
  //     this.stompClient.disconnect();
  //   }
  // }
}
