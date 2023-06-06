import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DialogNamePromptComponent } from '../drag-comp/dialog-name-prompt/dialog-name-prompt.component';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{
  n:number
  private newItemAddedSubscription: Subscription;
  constructor (private authService: AuthService, router: Router, private http: HttpClient, private calendarService: CalendarService) {

    
    if (this.authService.isLoggedIn())
      { //router.navigate(['login'])
      }
      // this.http.get<any[]>('http://localhost:8080/api/datecals/').subscribe(data => {
      //   this.n=data.length
      //   console.log('number',this.n)
      //   const badgeMenuItem = MENU_ITEMS.find(item => item.title === 'Nouvel Examen');
      //   if (badgeMenuItem) {
      //     badgeMenuItem.badge.text = this.n.toString();
      //   }
      // })
  }
  ngOnInit(): void {
    this.fetchBadgeValue()
    this.newItemAddedSubscription = this.calendarService.newItemAdded.subscribe(() => {
      this.fetchBadgeValue();
    });
    
  }
  fetchBadgeValue() {
    this.http.get<any[]>('http://localhost:8080/api/datecals/').subscribe(data => {
      this.n = data.length;
      console.log('number', this.n);
      if(this.n>0){      
        const badgeMenuItem = MENU_ITEMS.find(item => item.title === 'Nouvel Examen');
        if (badgeMenuItem) {
          
          badgeMenuItem.badge.text = this.n.toString();
          badgeMenuItem.badge.status = 'danger'
        }
      }
    });
  }
  
  

  menu = MENU_ITEMS;
  

}
