import { NgModule } from '@angular/core';
import {  NbAutocompleteModule, NbButtonModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbRouteTabsetModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbTimepickerModule, NbTreeGridModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { VisiteComponent } from './visite/visite/visite.component';
import { StatisticsComponent } from './statistiques/statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartjsBarComponent } from './statistiques/chartjs-bar.component';
import { ChartjsPieComponent } from './statistiques/chartjs-pie.component';

import { ChartjsBarHorizontalComponent } from './statistiques/chartjs-bar-horizontal.component';
import { ChartModule } from 'angular2-chartjs';
import { ParametersComponent } from './parameters/parameters.component';
import { UniopsComponent } from './parameters/UniopsComponent';
import { EmployeesComponent } from './employees/employees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeclarationComponent } from './stepper/declaration.component';
import { DialogNamePromptComponent } from '../drag-comp/dialog-name-prompt/dialog-name-prompt.component';
import { ColorPickerCellComponent } from './parameters/color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';




const components = [
  ChartjsBarComponent,

  ChartjsPieComponent,

  ChartjsBarHorizontalComponent,



];

@NgModule({




  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    Ng2SmartTableModule, 
    NbLayoutModule,
    //BrowserModule,
    NbCalendarModule,
    NgxChartsModule,
    NgxEchartsModule,
    ChartModule,
    NbSelectModule,
    NbRouteTabsetModule,
    NbTabsetModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NbStepperModule,
    NbButtonModule,
    NbAutocompleteModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbCheckboxModule,
    ColorPickerModule
  ],
  declarations: [
    PagesComponent,
    EmployeesComponent,
    VisiteComponent,
    StatisticsComponent,
    ChartjsBarComponent,
    ChartjsBarHorizontalComponent,
    ChartjsPieComponent,
    ParametersComponent,
    UniopsComponent,
    DeclarationComponent,
    DialogNamePromptComponent,
    ColorPickerCellComponent
    ],
    
})
export class PagesModule {
}
