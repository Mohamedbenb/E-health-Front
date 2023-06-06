import { Injectable } from '@angular/core';
import {Client, IMessage, Message, Stomp} from '@stomp/stompjs'
import * as SockJS from 'sockjs-client';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  url = environment.url
  private stompClient: Client;
  private messageSubject: Subject<any>;
  constructor() {
    this.messageSubject = new Subject<any>();
  }

  connect(): Observable<any> {
    const socket = new SockJS('http://localhost:8080/websocket');
    this.stompClient = new Client();

    // Set the WebSocket connection to the STOMP client
    this.stompClient.webSocketFactory = () => socket;

    // Activate the STOMP client
    this.stompClient.activate();

    // Wait for the STOMP client to connect
    return new Observable(observer => {
      const subscription = this.stompClient.onConnect = () => {
        //subscription.unsubscribe();
        observer.next();
        observer.complete();
      }
    });
  }

  subscribe(destination: string): Observable<any> {
    console.log('called')
    return new Observable(observer => {
      const subscription = this.stompClient.subscribe(destination, (message: IMessage) => {
        observer.next(JSON.parse(message.body));
        console.log('JSON.parse(message.body)',JSON.parse(message.body))
      });
    });
  }

  sendMessage(destination: string, message: any): void {
    this.stompClient.publish({
      destination: destination,
      body: JSON.stringify(message)
    });
  }
  getSessionId(): string {
    let sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('sessionId', sessionId);
    }

    return sessionId;
  }
  
  
  setSessionId(sessionId: string): void {
    sessionStorage.setItem('sessionId', sessionId);
  }
  
  clearSessionId(): void {
    sessionStorage.removeItem('sessionId');
  }
}


