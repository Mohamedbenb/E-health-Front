import { Component, Input } from "@angular/core";
import { Cell, ViewCell } from "ng2-smart-table";

import { EmployeeService } from "../../services/employee.service";

@Component({
    selector: 'my-checkbox',
    template: `
    <input type="checkbox" [checked]="rowData.status" (change)="setValue(rowData)">
  `,
  })
 
  export class MyCheckboxComponent implements ViewCell {

    @Input() rowData: any;
    @Input() value: any
   
    constructor(private serv:EmployeeService) {}
    ngOnInit() {
   
    }
  
    onChange(event: any) {
      this.value = event.target.status;
      console.log('value from child click',event.status)
      //this.cell.setValue(this.value);
      //this.rowData[this.cell.getId()] = this.value;
    }
  
    setValue(rowData: any) {
      rowData.status=!rowData.status
      this.serv.updateData(rowData).subscribe((data) => {
        console.log('res',data)
        
      }, (error) => {  
        console.error('Error loading table data:', error);
        });

    }
  }