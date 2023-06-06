import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAlertModule, NbAutocompleteModule, NbButton, NbButtonModule, NbCalendarModule, NbCardModule, NbDatepicker, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbOptionModule, NbSelectModule, NbStepperModule, NbTimepickerModule, NbTreeGridModule, NbWindowModule } from '@nebular/theme';
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
    NbSelectModule,
    NbStepperModule,
    NbTimepickerModule,
    NbAutocompleteModule,
    NbOptionModule
    
    
    
  ],
  declarations: [
    
    
    
    
  ],
})
export class Modalmodule {
}