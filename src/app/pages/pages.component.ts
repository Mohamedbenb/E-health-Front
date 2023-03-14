import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

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
export class PagesComponent {
  
  constructor (private authService: AuthService, router: Router) {
    
    if (this.authService.isLoggedIn())
      { //router.navigate(['login'])
      }
      
  }
  
  

  menu = MENU_ITEMS;
  

}
