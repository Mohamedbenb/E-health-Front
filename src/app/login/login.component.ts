import { Component, OnInit, Injector, Inject, ChangeDetectorRef, ɵɵFactoryDeclaration } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService  }  from 'ngx-toastr' ;
import { throwError } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.payload';
import { NbAuthService, NbAuthSocialLink, NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'ngxlogin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;
  protected service: NbAuthService;
  protected options: {};
  protected cd: ChangeDetectorRef;
  protected router: Router;
  redirectDelay: number;
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: any;
  submitted: boolean;
  socialLinks: NbAuthSocialLink[];
  rememberMe: boolean;
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    router: Router, private toastr: ToastrService, service: NbAuthService,  cd: ChangeDetectorRef,) {
    
      this.loginRequestPayload = {
        username: '',
        password: ''
      };
    }

    static ɵfac: ɵɵFactoryDeclaration<NbLoginComponent, never>;
    //static ɵcmp: ɵɵComponentDeclaration<NbLoginComponent, "nb-login", never, {}, {}, never, never, false>;

ngOnInit(): void {
  this.loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  this.activatedRoute.queryParams
    .subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login!';
      }
    });
}

login() {
  this.loginRequestPayload.username = this.loginForm.get('username').value;
  this.loginRequestPayload.password = this.loginForm.get('password').value;

  this.authService.login(this.loginRequestPayload).subscribe(data => {
    this.isError = false;
    this.router.navigateByUrl('pages');
    this.toastr.success('Login Successful');
  }, error => {
    this.isError = true;
    throwError(error);
  });
}

}

  


