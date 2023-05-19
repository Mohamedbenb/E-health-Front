import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../../auth/auth.guard';
import { WebSocketService } from '../../../services/web-socket.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  faUser = faUser;
  isLoggedIn: boolean;
  username: string;
  
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out', data: { id: 'logout' } }  ];
  visites: any[] = []

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: AuthService, private router: Router,
              //private nb: NbMenuItem
              private ath : AuthGuard,
              private webSocketService: WebSocketService
              ) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
      this.menuService.onItemClick().subscribe((event) => {
        if (event.item.title === 'Log out') {
          console.log('logout clicked');
          this.logout();
          
          
        }
      });
      this.webSocketService.init();
      this.webSocketService.subscribeToVisiteEvent(this.onVisiteEvent.bind(this));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  async logout() {
if (this.authService.isLoggedIn())
  { await this.authService.logout();}
    this.isLoggedIn = false;
    this.router.navigate([''])
    .then(() => {
      window.location.reload();
    });
    
  }
  onVisiteEvent(visite: any): void {
    // Handle the received visite event
    this.visites.push(visite);
  }
}
