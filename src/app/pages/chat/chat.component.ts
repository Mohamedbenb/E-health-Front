import { Component, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/internal-compatibility';
import { environment } from '../../../environments/environment';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'ngx-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private websocketService: WebSocketService){
    
  }
  readonly tableData = {
    columns: [ 'First Name', 'Last Name', 'Age' ],
    rows: [
      { firstName: 'Robert', lastName: 'Baratheon', age: 46 },
      { firstName: 'Jaime', lastName: 'Lannister', age: 31 },
    ],
  };


  messages: any[] = [];
  socket$: WebSocketSubject<unknown>;

  ngOnInit(): void {
    this.loadMessages();
    this.connectWebSocket();
    
  }

  sendMessage(event: any): void {
    const message = {
      text: event.message,
      date: new Date(),
      reply: true,
      type: 'text',
      
      name: 'Gandalf the Grey',
      avatar: 'https://i.gifer.com/no.gif',
      
    };
  
    this.websocketService.sendMessage(`/app/sendMessage`, message);
    
    
    // Add the message to the local list for display
    this.messages.push(message);
  }
  private connectWebSocket(): void {
    this.websocketService.connect().subscribe(
      () => {
        console.log('WebSocket connection established'); // Log successful connection
        this.websocketService.subscribe('/topic/receiveMessage').subscribe(
          (message) => {
            console.log('Received message:', message);
            this.messages.push(message); 
          }
        );
      },
      (error) => {
        console.error('WebSocket connection failed:', error); // Log connection error
      }
    );
  }


  private loadMessages(): void {
    this.messages = [
      {
        type: 'link',
        text: 'Now you able to use links!',
        customMessageData: {
          href: 'https://akveo.github.io/nebular/',
          text: 'Go to Nebular',
        },
        reply: false,
        date: new Date(),
        user: {
          name: 'Frodo Baggins',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        type: 'link',
        customMessageData: {
          href: 'https://akveo.github.io/ngx-admin/',
          text: 'Go to ngx-admin',
        },
        reply: true,
        date: new Date(),
        user: {
          name: 'Meriadoc Brandybuck',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        type: 'button',
        customMessageData: 'Click to scroll down',
        reply: false,
        date: new Date(),
        user: {
          name: 'Gimli Gloin',
          avatar: '',
        },
      },
      {
        type: 'table',
        text: `Now let's try to add a table`,
        customMessageData: this.tableData,
        reply: false,
        date: new Date(),
        user: {
          name: 'Fredegar Bolger',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        type: 'table',
        text: `And one more table but now in the reply`,
        customMessageData: this.tableData,
        reply: true,
        date: new Date(),
        user: {
          name: 'Fredegar Bolger',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
    ]
  }
  
}