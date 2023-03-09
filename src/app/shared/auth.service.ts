import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/singup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import moment from "moment";
import { JwtHelperService } from '@auth0/angular-jwt';
import { distinctUntilKeyChanged } from 'rxjs/internal/operators/distinctUntilKeyChanged';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private refreshInProgress = false;
   jwtHelper = new JwtHelperService();
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }
  router: Router;

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    ) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<any> {
    localStorage.clear();
    console.log('tit')
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(tap((data):any => {
        this.localStorage.store('accessToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        this.getRefreshToken() 
        console.log(this.getRefreshToken())
        console.log(this.jwtHelper.getTokenExpirationDate(this.getJwtToken()))
        return true;
      }));
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Return true if both tokens are present in local storage
    //return accessToken !== null && refreshToken !== null;
    return true;
  }

  getJwtToken() {
    return this.localStorage.retrieve('accessToken');
  }


 
 refreshToken(): Observable<any> {
  const refreshToken = this.localStorage.retrieve('refreshtoken');
  const username = this.localStorage.retrieve('username');
  console.log(refreshToken)
  console.log(username)
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  if (this.refreshInProgress) {
    // If a refresh request is already in progress, return the existing observable
    return this.httpClient.get('http://localhost:8080/api/auth/refresh/token');
  }

  // Otherwise, make a new request to refresh the token
  this.refreshInProgress = true;

  return this.httpClient.post('http://localhost:8080/api/auth/refresh/token',refreshToken, username).pipe(
    tap((response: any) => {
      console.log(response)
      this.localStorage.store('accessToken', response.authenicationToken);
      this.localStorage.store('refreshToken', response.refreshToken);
      this.localStorage.store('expiresAt', response.expiresAt);
      this.refreshInProgress = false;
    })
  );
}         
    
         
  


logout(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
 //logout() {
 //  this.refreshToken();
 //  this.refreshTokenPayload = {
 //    
 //    refreshToken: this.getRefreshToken(),
 //    username: this.getUserName()
 //  }
 //  this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
 //    { responseType: 'text' })
 //    .subscribe(data => {
 //      console.log(this.refreshTokenPayload);
 //      
 //    }, error => {
 //      throwError(error);
 //      console.log(this.refreshTokenPayload);
 //    })
 //    
 //  
 //  this.localStorage.clear('accessToken');
 //  this.localStorage.clear('username');
 //  this.localStorage.clear('refreshToken');
 //  this.localStorage.clear('expiresAt');
 //  return true;
 //}

 

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}

