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
      
      console.log(this.authService.isLoggedIn());
      console.log(this.authService.jwtHelper.isTokenExpired(this.authService.getJwtToken()))
      console.log(this.authService.jwtHelper.getTokenExpirationDate(this.authService.getJwtToken()))
      
      console.log(this.authService.jwtHelper.getTokenExpirationDate(this.authService.getJwtToken()))
      setTimeout(() =>{
        this.authService.refreshToken();
        console.log(this.authService.jwtHelper.getTokenExpirationDate(this.authService.getJwtToken()))
        console.log(this.authService.getRefreshToken())
        console.log(this.authService.jwtHelper.isTokenExpired(this.authService.getJwtToken()))},10000)
  }
  
  

  menu = MENU_ITEMS;
  

}
