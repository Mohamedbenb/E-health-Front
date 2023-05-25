import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { SocieteService } from '../../services/societe.service';
import { Societe } from '../../models/Societe';
import { UniOp } from '../../models/UniOp';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { FormControl } from '@angular/forms';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { LocalDataSource } from 'ng2-smart-table';
import { VisiteService } from '../../services/service-visite.service';
import { DataSource } from '@angular/cdk/collections';
import { NavigationEnd, Router } from '@angular/router';

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
  selectedItem:number
  data:any
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

  constructor(private societeService: SocieteService, 
              private employeeService: EmployeeService, 
              private visiteService: VisiteService,
              private sharedService: SharedService,
              private router: Router) 
              {
                this.employeeFormControl=new FormControl
                const subscription=this.router.events
                .pipe(filter(event => event instanceof NavigationEnd))
                .subscribe(() => {
                  this.data = this.router.getCurrentNavigation()?.extras?.state;
                  if (this.data) {
                    console.log('Data from nouveau visite',this.data);
                    this.selectedOption=this.data.employee?.uniop
                    this.selectedItem=this.selectedOption?.id;
                    console.log('selected itme', this.selectedItem)
                    this.getSelectedEmployee(this.data.employee)
                    this.employee=this.data.employee// Access the additional data
                    this.employeeFormControl.setValue(this.data.employee.firstname + ' ' + this.data.employee.lastname)
                    this.employeeService.getOne(this.data.employee.id).subscribe((response)=>{
                      this.tableData = new LocalDataSource(response.visites)
                    })
                  }
                  subscription.unsubscribe();
    });
              }
  settings=this.sharedService.getSettings(this.columns)
  ngOnInit(): void {
    //this.employee=new Employee
    
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
    this.employeeFormControl.setValue('')
    

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

    this.tableData= new LocalDataSource(this.employee?.visites)
  }
  
  trackByFn(item) {
    return item.id;
  }

  

}