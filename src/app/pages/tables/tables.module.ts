import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbRouteTabsetModule, NbSelectModule, NbTabsetModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';

import { UniopsComponent } from './tree-grid/UniopsComponent';


@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbSelectModule
  ],
  declarations: [
    ...routedComponents,
    
    UniopsComponent
    
  ],
})
export class TablesModule { }
