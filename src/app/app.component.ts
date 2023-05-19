/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit, Inject } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { NotificationService } from './services/notification.service';
import { WebSocketService } from './services/web-socket.service';




@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  isServiceInitialized = false;
  constructor(private analytics: AnalyticsService, private seoService: SeoService, private notificationService: NotificationService, private websocketService:WebSocketService,





    
    
    ) {


  }

  ngOnInit(): void {

    
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    //this.notificationService.init((visite: any) => {
    //  this.handleNewVisiteEvent(visite);
    //});
    

    this.websocketService.init();
    
  
    
    

}
private handleNewVisiteEvent(visite: any): void {
  // Handle the received visite event
  console.log('New visite event:', visite);
  // Implement your logic here
}

subscribeToVisiteEvent() {
  this.websocketService.subscribeToVisiteEvent((visite: any) => {
    // Handle the received visite event
    console.log('New visite event received:', visite);
    // Perform further actions as needed
  });
}
}