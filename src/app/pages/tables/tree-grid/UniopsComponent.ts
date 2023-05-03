import { Component, Input } from "@angular/core";
import { Cell, ViewCell } from "ng2-smart-table";
import { CustomTableService } from "../../../custom-table.service";

@Component({
    selector: 'my-checkbox',
    
    template: `
    <nb-select placeholder="Unités opérationelles">
    <nb-option *ngFor="let item of uniops" [value]="uniops.indexOf(item)">{{item.title}}</nb-option>
    </nb-select>
  `,
  })
 
  export class UniopsComponent implements ViewCell{

    @Input() rowData: any;
    @Input() value: any
    uniops
    constructor(private serv:CustomTableService) {}
    ngOnInit() {
        
        this.uniops=this.rowData.uniops
        console.log(this.uniops)
    }
  }