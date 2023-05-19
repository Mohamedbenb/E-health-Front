import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private webSocketService: WebSocketService) {}

  init(callback: (visite: any) => void): void {
    this.webSocketService.init();
    this.webSocketService.subscribeToVisiteEvent(callback);
  }
  
  private displayNotification(visite: any): void {
    // Implement your notification display logic here
    console.log('New Visite:', visite);
  }
}
