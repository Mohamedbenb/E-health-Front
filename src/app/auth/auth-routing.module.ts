import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: NbAuthComponent,
        children: [
            {
              path: 'login',
              component: LoginComponent, // <---
            },
            {
              path: 'signup',
              component: SignupComponent,
            },
          ],  // <---
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class NgxAuthRoutingModule {
}