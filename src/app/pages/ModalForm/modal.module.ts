import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAlertModule, NbButton, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbMenuModule, NbTreeGridModule, NbWindowModule } from '@nebular/theme';
import { BrowserModule } from '@angular/platform-browser';



import { ModalFormComponent } from './ModalFormComponent';
import { ThemeModule } from '../../@theme/theme.module';




@NgModule({
  imports: [  
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbAlertModule,
    FormsModule,
    NbButtonModule,
    NbWindowModule,
    
  ],
  declarations: [
    ModalFormComponent,

  ],
})
export class Modalmodule {
}