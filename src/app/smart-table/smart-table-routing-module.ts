import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SmartTableComponent } from "../pages/tables/smart-table/smart-table.component";
import { SMComponent } from "./smart-table.component";

export const routes: Routes =[
    {
        path:"table", component: SMComponent
        
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SmartTableRoutingModule { }