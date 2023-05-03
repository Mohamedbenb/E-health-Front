import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAlertModule, NbButton, NbButtonModule, NbCalendarModule, NbCardModule, NbDatepicker, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbTreeGridModule, NbWindowModule } from '@nebular/theme';
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
    ReactiveFormsModule,
    NbDatepickerModule,
    NbCalendarModule,
    ReactiveFormsModule
    
    
    
  ],
  declarations: [
    
    

  ],
})
export class Modalmodule {
}