import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { SocieteService } from '../../services/societe.service';
import { Societe } from '../../models/Societe';
import { UniOp } from '../../models/UniOp';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { LocalDataSource } from 'ng2-smart-table';
import { VisiteService } from '../../services/service-visite.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'ngx-historique',
  templateUrl:'historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  
  societes: Societe[];
  employees: Employee[];
  selectedOption: UniOp;
  filteredOptions$:any
  employeeFormControl: FormControl;
  employee:Employee;
  selected=false
  tableData: LocalDataSource;


  columns={
    
      type:{
        title:'Type',
        type:'String',
        valuePrepareFunction: (cell, row) => row.primaryType && row.primaryType.type ? row.primaryType.type : '',
      },
    
    dateValidation: {
      title: 'Date de la visite',
      type: 'string',
      valuePrepareFunction: (cell, row) => {
        if (cell) {
          const date = new Date(cell);
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return formattedDate + ' ' + formattedTime;
        } else {
          return '';
        }
      },
    },
    recommendation:{
      title:'Recommendation',
      type:'String',
      
    },

  }
  selectedEmployee=false;

  constructor(private societeService: SocieteService, private employeeService: EmployeeService, private visiteService: VisiteService,private sharedService: SharedService) {}
  settings=this.sharedService.getSettings(this.columns)
  ngOnInit(): void {
    this.employee=new Employee
    this.employeeFormControl=new FormControl
    this.societeService.getData().subscribe((data)=>{
      console.log('heeeey')
      this.societes=data;
    })
    
  }
  onClick(option){
    this.selected= true;
    this.selectedOption = option;
    console.log('selectedoption',this.selectedOption)
    this.getEmployees(this.selectedOption.id)
    

  }
  getEmployees (id:any){
    console.log('called getEmployees')
    this.employeeService.getbyuni(id).subscribe((data)=>{
      this.employees=data;
      console.log('data',data);
      this.filteredOptions$ = this.employeeFormControl.valueChanges.pipe(
        startWith(''),
        map((selectedOption) => {
          const filterString =
            typeof selectedOption === 'string'
              ? selectedOption
              : selectedOption.firstname.toString();
          return this.employeeService.filterEmployees(filterString,this.employees);
        })
      );
    },(error)=>{
      console.error('error getting employees',error)
    });
  }
  getSelectedEmployee(data){
    this.selectedEmployee=true
    this.employee=data
    console.log('selected employee',this.employee)

    this.tableData= new LocalDataSource(this.employee.visites)
  }
  
  trackByFn(item) {
    return item.id;
  }

  

}
