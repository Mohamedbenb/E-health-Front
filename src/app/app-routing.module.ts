import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { DragCompComponent } from './drag-comp/drag-comp.component';







export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
      
      
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
    .then(m => m.NgxAuthModule),
    
  },
  {path: 'smt',
    loadChildren: () => import('./smart-table/smart-table.module')
  .then(m => m.SmartTableModule),
 },
 // { path: 'login', redirectTo: 'pages', pathMatch: 'full' },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {path:'cal', component:DragCompComponent}



  
];



@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
