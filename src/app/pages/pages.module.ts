import { NgModule } from '@angular/core';
import { NbCalendarModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbRouteTabsetModule, NbSelectModule, NbTabsetModule, NbTreeGridModule } from '@nebular/theme';

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
import { ParametersComponent } from './parameters/parameterscomponent';
import { UniopsComponent } from './parameters/UniopsComponent';
import { EmployeesComponent } from './employees/employees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
    FormsModule
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
    UniopsComponent
    ],
})
export class PagesModule {
}
