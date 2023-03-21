/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardComponent,
  NbCardModule,
  NbChatModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  
  NbWindowModule,
} from '@nebular/theme';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TokenInterceptor } from './token-interceptor';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { Modalmodule } from './pages/ModalForm/modal.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DragCompComponent } from './drag-comp/drag-comp.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DateTimePickerComponent } from './drag-comp/DateTimePickerComponent';
import { NgbDatepickerModule, NgbModalModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from './drag-comp/blockui/block-template.component';





@NgModule({
  declarations: [AppComponent, DragCompComponent, DateTimePickerComponent],
  imports: [
    NbLayoutModule,
    Modalmodule,
    FlatpickrModule.forRoot(),
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    NgbModalModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,    
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NbCardModule,
    Ng2SmartTableModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    //NgxAuthRoutingModule,
    ReactiveFormsModule,
    
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      
      
      
    },

  ],
})
export class AppModule {
}
