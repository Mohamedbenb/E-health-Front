import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';



import { DragCompComponent } from '../drag-comp/drag-comp.component';
import { VisiteComponent } from './visite/visite/visite.component';

import { ParametersComponent } from './parameters/parameters.component';
import { EmployeeService } from '../services/employee.service';
import { EmployeesComponent } from './employees/employees.component';
import { StatisticsComponent } from './statistiques/statistics.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { HistoriqueComponent } from './historique/historique.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [






    {
      path:'employees', 
      component:EmployeesComponent
    },


    {
      path:'declaration', 
      component:DeclarationComponent
    },


    {
      path:'cal', 
      component:DragCompComponent
    },
    {
      path:'visite', 
      component:VisiteComponent
    },
    {
      path:'parametrage', 
      component:ParametersComponent
    },
    {
      path:'statistics', 
      component:StatisticsComponent
    },

    {
      path:'historique', 
      component:HistoriqueComponent
    },
    {
      path:'details',
      component:DetailsComponent
    }


  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
