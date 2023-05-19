import { Injectable } from '@angular/core';
import {Client, Message} from '@stomp/stompjs'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  url = environment.url
  private client: Client;
  private readonly websocketUrl = 'ws://localhost:8080/websocket';
  private readonly topic = '/topic/new-visite';
  private onConnectCallback: () => void;
  constructor() {
    this.client = new Client();
  }

  public init(): void {
    this.configureWebSocket();
    this.client.onConnect = () => {
      console.log('connected');
    this.subscribeToVisiteEvent((visite: any) => {
      // Handle the visite event here
      console.log('New visite event received:', visite);
    });
  };
    this.client.activate();
  }

  private configureWebSocket(): void {
    this.client.brokerURL = this.websocketUrl;
    this.client.onConnect = this.onConnect.bind(this);
    this.client.onDisconnect = this.onDisconnect.bind(this);
    this.client.onStompError = this.onStompError.bind(this);
    this.client.onWebSocketClose = this.onWebSocketClose.bind(this);
  }


  private onDisconnect(): void {
    // Handle disconnection logic
  }

  private onStompError(error: any): void {
   console.log('this an error')
  }

  private onWebSocketClose(): void {
    // Handle WebSocket close
  }

  public subscribeToVisiteEvent(callback: (visite: any) => void): void {
    console.log('Called subscribeToVisiteEvent');
    this.client.subscribe(this.topic, (message: Message) => {
      const visite = JSON.parse(message.body);
      console.log('New visite event received:', visite);
      callback(visite);
    });
  }
  public onConnect(callback: () => void): void {
    console.log("connected");
    this.onConnectCallback = callback;
  }
}
