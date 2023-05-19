import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'ngx-historique',
  template: `
  <div *ngFor="let visite of visites">
    <!-- Display visite data -->
  </div>
`,
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  visites: any[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.init();
    this.webSocketService.subscribeToVisiteEvent(this.onVisiteEvent.bind(this));
  }

  onVisiteEvent(visite: any): void {
    // Handle the received visite event
    this.visites.push(visite);
  }
}
