import { Component, OnInit} from '@angular/core';
import {  NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import {  LocalDataSource } from 'ng2-smart-table';

import { ModalFormComponent } from '../ModalForm/ModalFormComponent';
import { MyCheckboxComponent } from './chkboxComponent';
import { actionSettings } from '../../constants';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { EmployeeService } from '../../services/employee.service';
import { SocieteService } from '../../services/societe.service';
import { Observable } from 'rxjs';
import { Societe } from '../../models/Societe';
import { FilterComponent } from '../historique/custom.filter.component';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./employees.component.scss'],
  templateUrl: 'employees.component.html',
})
export class EmployeesComponent implements OnInit{
  modalForm: FormGroup;
   dateValidator(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const value = control.value;
  
      // Check the date format and return validation error if it doesn't match
      const validDateFormat = /^\d{2}\s\w{3}\.\s\d{4}$/;
      if (!validDateFormat.test(value)) {
        return { invalidDateFormat: true };
      }
  
      // Additional date validations can be performed here if needed
  
      return null; // Return null if the date is valid
    };
  }
  formData = {firstname: '', matricule: '',status: false, lastname: '', email: '', datenai: new Date(),daterecru: new Date()};
  fields = [
    { name: 'firstname', type: 'text', title:'Prénom', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'lastname', type: 'text', title:'Nom', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'postetrav', type: 'text', title:'Poste de Travaille', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'email', type: 'email', title:'Email', validators: [Validators.required, Validators.email] },
    { name: 'matricule', type: 'number', title:'Matricule', validators: [Validators.required, Validators.minLength(8)]},
    { name: 'datenai', type: 'nb-datepicker', title: 'Date de naissance', validators: [this.dateValidator()] },
    { name: 'daterecru', type: 'nb-datepicker', title: "Date d'embauche", validators: [this.dateValidator()] },
    
  ];

  item={ name: 'uniop', type: 'select', title: "Unité operationelle", validators: [Validators.required],optionGroups: [] }
  extra=1;
  tableData: LocalDataSource;
  societes:Societe[]
  societe$: Observable<any>
   
  cols = {
    

    firstname: {
      title: 'Nom',
      type: 'string',
      hide:false
      
    },
    lastname: {
      title: 'Prénom',
      type: 'string',
      hide:false
    },
    matricule: {
      title: 'Matricule',
      type: 'number',
      hide:false
    },
    status: {
      title: 'EVREST',
      type: 'custom',
      renderComponent: MyCheckboxComponent,
      valuePrepareFunction: (cell, row) => (cell ? 'Oui' : 'Non'),
      filter: {
        type: 'custom',
        component: FilterComponent,
      },
      hide:false,
      
    },
    email: {
      title: 'E-mail',
      type: 'string',
      hide:false
      
    },
    uniopname: {
      title: 'Unité opérationelle',
      type: 'string',
      hide:false
      
    },
    postetrav:{
      title:'Poste de travail',
      type:'string',
      hide:false
    },
    age: {
      title: 'Age',
      type: 'number',
      hide:false
    },
    daterecru:{
      title:"Date d'embauche",
      type: 'string',
      hide:false
    }
  }
  
  selectedOptions: any[] = [];
  settings = {
    columns: this.cols,
    
    ...actionSettings
    }

  allColumns = Object.keys(this.cols).map(key => {
  const column = this.cols[key];
  return {
    title: column.title,
    type: column.type,
    renderComponent: column.renderComponent || null, // check for custom component
  };
});

  constructor(private customTableService: EmployeeService,
              private dialogService: NbDialogService,
              private societeService: SocieteService,
              private toastrService: NbToastrService
             
              
    ) {

      
    
  }
  public displayedColumns: any[] = [];

  onSelectChange() {
    console.log('Selected options:', this.selectedOptions);
    for (const key in this.cols) {
      if (this.cols.hasOwnProperty(key)) {
        this.cols[key].hide = !this.selectedOptions.includes(this.cols[key].title);
      }
    }
    this.settings = Object.assign({}, this.settings, { columns: this.cols })
    
  }
field:any[]=[]
  
  ngOnInit() {
    this.fields.forEach((element)=>{
      this.field.push(element)
    })
    console.log('field',this.field)
    console.log('fields',this.fields)
    this.field.push(this.item)
    console.log('fields2',this.fields)
    console.log('field',this.field)
    //this.societe$ = this.Ser.getData();
    //  this.societeService.getData().subscribe((data)=>{
    //    console.log('heeeey')
    //    this.societes=data;
    //    const optionGroups = data.map((societe) => ({
    //      title: societe.title,
    //      uniops: societe.uniops,
    //    }));
    //    console.log('optionGroups', optionGroups);

    //    this.fields.find((field) => field.name === 'uniop').optionGroups = optionGroups;
    //  })
  
    this.loadTableData();
    this.selectedOptions = [this.cols.firstname.title,this.cols.lastname.title];
    this.onSelectChange()
    
    
}
showToast(status: NbComponentStatus) {
  this.toastrService.show(status, `Toast: `, { status });
}
addSelectElement(fields:any){
  
  this.societeService.getData().subscribe((data)=>{
    console.log('heeeey')
    this.societes=data;
    const optionGroups = data.map((societe) => ({
      title: societe.title,
      uniops: societe.uniops,
    }));
    console.log('optionGroups', optionGroups);
  
    fields.find((field) => field.name === 'uniop').optionGroups = optionGroups;
  })
}

  loadTableData() {
    this.customTableService.getData().subscribe((data) => {
    this.tableData=new LocalDataSource(data);
    
  }, (error) => {  
    console.error('Error loading table data:', error);
    });
    
  }

  onDeleteConfirm(event: any): void {
    const tableData = event.data;
    this.dialogService.open(ModalFormComponent, {
      context: {
        emp:'employee',
        dialogTitle: 'delete Item',
        action: 'delete',
        dialogData:tableData,
        customTableService: this.customTableService
      },}).onClose.subscribe(() => {
        console.log('updating')
        this.loadTableData();
      })
  }

  openAddDialog() {
    
    this.addSelectElement(this.field)
    console.log('checkpoint',this.formData)
    this.dialogService.open(ModalFormComponent, {
      context: {
        emp:'employee',
        dialogTitle: 'Add Item',
        action: 'add',
        customTableService: this.customTableService,
        extra:this.extra,
        fields:this.field,
        modalForm:this.modalForm,
      },}).onClose.subscribe(() => {
        console.log('updating')
        
        this.loadTableData();
      })
  }

  onEditClick(event: any) {
    console.log("ev",event.data.uniop_id)
    // get the data of the selected row
    const tableData = event.data;
    console.log("tableData",tableData)
  
    // open the dialog with pre-filled fields
    this.dialogService.open(ModalFormComponent, {
      context: {
        emp:'employee',
        dialogTitle: 'Edit Item',
        action: 'edit',
        dialogData: tableData,
        customTableService: this.customTableService,
        extra:this.extra,
        fields:this.fields,
        modalForm:this.modalForm
      },
    },).onClose.subscribe(() => {
      console.log('updating',this.tableData)
      //this.showToast('success')
      this.loadTableData();
    })
    }
}
