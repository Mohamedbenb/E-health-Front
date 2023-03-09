import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbButton, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbMenuModule, NbTreeGridModule, NbWindowModule } from '@nebular/theme';
import { BrowserModule } from '@angular/platform-browser';



import { ModalFormComponent } from './ModalFormComponent';
import { ThemeModule } from '../../@theme/theme.module';




@NgModule({
  imports: [
    BrowserModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbWindowModule,
    
  ],
  declarations: [
    ModalFormComponent,

  ],
})
export class Modalmodule {
}