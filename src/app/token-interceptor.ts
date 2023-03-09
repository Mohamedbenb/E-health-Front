import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { catchError, switchMap, take, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    refreshTokenInProgress = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<any> {
        const accessToken = this.authService.getJwtToken();

        if (accessToken) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`
              }
            });
          }

          return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                if (this.refreshTokenInProgress) {
                  return this.refreshTokenSubject.pipe(
                    switchMap(() => {
                      return next.handle(this.addAccessToken(request));
                    })
                  );
                }else {
                            this.refreshTokenInProgress = true;
                            this.refreshTokenSubject.next(null);

                            return this.authService.refreshToken().pipe(
                                switchMap((response: any) => {
                                  localStorage.setItem('accessToken', response.accessToken);
                                  localStorage.store('expiresAt', response.expiresAt);
                                  this.refreshTokenInProgress = false;
                                  this.refreshTokenSubject.next(response.accessToken);
                                  return next.handle(this.addAccessToken(request));
                                }),
                                catchError((error: HttpErrorResponse) => {
                                    return throwError(error);
                                  })
                                );
                              }
                            }
                            return throwError(error);
                        })
                      );
                    }
        private addAccessToken(request: HttpRequest<any>) {
        const accessToken = localStorage.getItem('accessToken');
    
        if (accessToken) {
          return request.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        }
    
        return request;
      }
      
    

}