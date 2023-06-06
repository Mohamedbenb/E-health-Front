import { Component, Input, OnInit } from "@angular/core";


import { EmployeeService } from "../../services/employee.service";

@Component({
    selector: 'my-checkbox',
    
    template: `
     <nb-select [selected]="s" (selectedChange)="onChange($event)">
      <nb-option [value]="true">Oui</nb-option>
      <nb-option [value]="false">Non</nb-option>
    </nb-select>
    
  `,
  })
 
  export class MyCheckboxComponent implements OnInit {

    @Input() rowData: any;
    @Input() value: any
    
    s:boolean
    constructor(private serv:EmployeeService) {
      
    }
    ngOnInit(): void {
      this.s=this.rowData.status
    }
  
    onChange(value: boolean) {
      
      console.log('value from child click',value)
      this.rowData.status=value
      this.serv.updateData(this.rowData).subscribe((response)=>{
        console.log(response)
      })
      console.log('cell from custom boolean field',this.rowData.status)
      console.log('value from custom boolean field',this.rowData)
     
    }
  
    
    
  }