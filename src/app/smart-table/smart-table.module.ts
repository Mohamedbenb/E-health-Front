import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NbCardModule,  NbIconModule,  NbInputModule, NbLayoutModule, NbSidebarModule, NbTreeGridModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../@theme/theme.module";
import { Modalmodule } from "../pages/ModalForm/modal.module";
import { SmartTableRoutingModule } from "./smart-table-routing-module";
import {  SMComponent } from "./smart-table.component";

@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbInputModule,
        Ng2SmartTableModule,
        Modalmodule,
        NbCardModule,
        NbLayoutModule,
        ThemeModule,
        NbTreeGridModule,
        NbIconModule,
        SmartTableRoutingModule,
        NbSidebarModule,
        

    ],
    declarations:[SMComponent],

})
export class SmartTableModule { }