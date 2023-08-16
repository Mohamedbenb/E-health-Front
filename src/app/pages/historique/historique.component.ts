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
import { ExamensComplementairesService } from '../../services/examens-complementaires.service';
import { DeclarationService } from '../../services/declaration.service';

import { BooleanComponent1 } from './booleanComponents/boolean.component';
import { BooleanComponent2 } from './booleanComponents/boolean2.component';
import { FilterComponent } from '../../shared/custom.filter.component';
import { ResponseComponent } from './booleanComponents/response.component';


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
  tableDataExam: LocalDataSource;
  tableDataDec: LocalDataSource;
  selectedItem:number
  data:any
  columns={
    
      type:{
        title:'Type',
        type:'String',
        valuePrepareFunction: (cell, row) => row.primaryType && row.primaryType.type ? row.primaryType.type : '',
      },
    
    dateValidation: {
      title: 'Date de la 1ére visite',
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
    dateValidation2: {
      title: 'Date de la 2éme visite',
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
  columnsExam={
    
    type:{
      title:'Type',
      type:'String',
      valuePrepareFunction: (cell, row) => row.typeExam && row.typeExam.type ? row.typeExam.type : '',
    },
  
  dateValidation: {
    title: 'Date validation',
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
  
  rappel: {
    title: 'Date rappel',
    type: 'string',
    valuePrepareFunction: (cell, row) => {
      if (cell) {
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        
        return formattedDate 
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
  selectedTabIndex: number = 0;
  toggleTab(index: number) {
    this.selectedTabIndex = index;
  }
  constructor(private societeService: SocieteService, 
              private employeeService: EmployeeService, 
              private visiteService: VisiteService,
              private sharedService: SharedService,
              private router: Router,
              private examService:ExamensComplementairesService,
              private declarationService: DeclarationService
              ) 
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
 
                  }
                  if(this.data?.index){this.activeTabIndex=this.data.index}
                  subscription.unsubscribe();
    });
              }
  settings=this.sharedService.getSettings(this.columns)
  settingsExam=this.sharedService.getSettings(this.columnsExam)
  settingsDec = {
    
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        add:false,
        edit: false,
        delete: false,
        position: 'right',
        },

        noDataMessage:'Pas de données',
      columns:{
    
        type:{
          title:'Catégorie de la MP',
          type:'String',
          valuePrepareFunction: (cell, row) => row.mal && row.mal.title ? row.mal.title : '',
          editable:false,
        },
      
      dateDec: {
        title: 'Date de la déclaration MP',
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
        editable:false,
      },
      constat: {
        title: 'Constatation médicale',
        type: 'string',
        editable:false,
      },
      depotcnam:{
        title:'Dépôt CNAM',
        
        type: 'custom',
        
        
        renderComponent: BooleanComponent1,
        
        valuePrepareFunction: (cell, row) => (cell ? 'Oui' : 'Non'),
        editable:false,
        filter: {
          type: 'custom',
          component: FilterComponent,
        },
        
      },
      diagnosticcnam:{
        title:'Diagnostic CNAM',
        
        type: 'custom',
        renderComponent: BooleanComponent2,
        
        valuePrepareFunction: (cell, row) => (cell ? 'Oui' : 'Non'),
        editable:false,
        filter: {
          type: 'custom',
          component: FilterComponent,
        },
      
      
        
      },
      reponsecnam:{
        title:'Réponse CNAM',
        type: 'custom',
        renderComponent: ResponseComponent,
        editable:false,
        //valuePrepareFunction: (cell, row) => (cell ? 'Accepté' : 'Refusé'),
         
        
      },
      remarque:{
        title:'Remarques',
        type:'string',
        editable:false,
      },
      
      
      
      }
      
      
    
  }
  tabs = [
    { title: 'Examens médicaux', id: 'tab1' },
   
    { title: 'Examens complémentaires', id: 'tab2' },

    { title: 'Déclarations maladies professionelles', id: 'tab3' },
    
    
    
  ];
  activeTabIndex: number = 0;
  isTabActive(index: number): boolean {
    return this.activeTabIndex === index;
  }
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
    this.visiteService.getByEmployee(this.employee.id).subscribe((response)=>{
      
      this.tableData= new LocalDataSource(response)
    },(error)=>{
      console.log(error)
    })
    this.examService.getByEmployee(this.employee.id).subscribe((response)=>{
      console.log('exam res', response)
      this.tableDataExam= new LocalDataSource(response)
    },(error)=>{
      console.log(error)
    })
    this.declarationService.getByEmployee(this.employee.id).subscribe((response)=>{
      console.log('dec res', response)
      this.tableDataDec= new LocalDataSource(response)
    },(error)=>{
      console.log(error)
    })

    
  }
  
  trackByFn(item) {
    return item.id;
  }

  

}