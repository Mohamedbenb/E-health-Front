import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAlertModule, NbButton, NbButtonModule, NbCalendarModule, NbCardModule, NbDatepicker, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbSelectModule, NbTreeGridModule, NbWindowModule } from '@nebular/theme';
import { BrowserModule } from '@angular/platform-browser';



import { ModalFormComponent } from './ModalFormComponent';
import { ThemeModule } from '../../@theme/theme.module';
import { DialogNamePromptComponent } from '../../drag-comp/dialog-name-prompt/dialog-name-prompt.component';





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
    ReactiveFormsModule,
    NbSelectModule
    
    
    
  ],
  declarations: [
    
    
    ModalFormComponent,
    //DialogNamePromptComponent
  ],
})
export class Modalmodule {
}