import { NgModule } from '@angular/core';
import {  NbAutocompleteModule, NbBadgeModule, NbButtonModule, NbCalendarModule, NbCardModule, NbChatModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbRouteTabsetModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbTimepickerModule, NbTreeGridModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { VisiteComponent } from './visite/visite.component';
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
import { DeclarationComponent } from './declaration/declaration.component';

import { ColorPickerCellComponent } from './parameters/color-picker.component';

import { HistoriqueComponent } from './historique/historique.component';
import { DetailsComponent } from './details/details.component';
import { LinkComponent } from './parameters/linkComponents/link.component';
import { LinkComponent2 } from './parameters/linkComponents/link.component2';
import { LinkComponent3 } from './parameters/linkComponents/link.component3';
import { ModalFormComponent } from './ModalForm/ModalFormComponent';
import { BooleanComponent1 } from './historique/booleanComponents/boolean.component';

import { DialogNamePromptComponent } from '../drag-comp/dialog-name-prompt/dialog-name-prompt.component';
import { CustomOptionComponent } from './visite/custom.option.component';
import { CustomSelectComponent } from './visite/custom.select.component';
import { ChatComponent } from './chat/chat.component';
import { BooleanComponent2 } from './historique/booleanComponents/boolean2.component';
import { MyCheckboxComponent } from './employees/chkboxComponent';
import { FilterComponent } from '../shared/custom.filter.component';
import { ReshumComponent } from './parameters/reshum.component';

//import { BooleanRendererComponent } from './historique/boolean.renderer.component';




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
    NbChatModule,
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
    NbBadgeModule
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
    ColorPickerCellComponent,
    HistoriqueComponent,
    DetailsComponent,
    LinkComponent,
    LinkComponent2,
    LinkComponent3,
    ModalFormComponent,
    BooleanComponent1,
    BooleanComponent2,
    MyCheckboxComponent,
    CustomOptionComponent,
    CustomSelectComponent,
    ChatComponent,
    FilterComponent,
    ReshumComponent,
    
    //BooleanRendererComponent
    
    ],
    
    
})
export class PagesModule {
}
