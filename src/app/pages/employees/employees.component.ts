import { Component, OnInit} from '@angular/core';
import {  NbDialogService } from '@nebular/theme';
import {  LocalDataSource } from 'ng2-smart-table';

import { ModalFormComponent } from '../ModalForm/ModalFormComponent';
import { MyCheckboxComponent } from './chkboxComponent';
import { actionSettings } from '../../constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeService } from '../../services/employee.service';
import { SocieteService } from '../../services/societe.service';
import { Observable } from 'rxjs';
import { Societe } from '../../models/Societe';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./employees.component.scss'],
  templateUrl: 'employees.component.html',
})
export class EmployeesComponent implements OnInit{
  modalForm: FormGroup;
  formData = {firstname: '', matricule: '',status: false, lastname: '', email: '', datenai: new Date(),daterecru: new Date()};
  fields = [
    { name: 'firstname', type: 'text', title:'Prénom', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'lastname', type: 'text', title:'Nom', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'postetrav', type: 'text', title:'Poste de Travaille', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'email', type: 'email', title:'Email', validators: [Validators.required, Validators.email] },
    { name: 'matricule', type: 'number', title:'Matricule', validators: [Validators.required, Validators.minLength(8)]},
    { name: 'datenai', type: 'nb-datepicker', title: 'Date de naissance', validators: [Validators.required] },
    { name: 'daterecru', type: 'nb-datepicker', title: "Date d'embauche", validators: [Validators.required] },
    { name: 'uniop', type: 'select', title: "Unité operationelle", validators: [Validators.required],optionGroups: [] },
  ];
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
      title: 'Prenom',
      type: 'string',
      hide:false
    },
    matricule: {
      title: 'Matricule',
      type: 'number',
      hide:false
    },
    Status: {
      title: 'EVREST',
      type: 'custom',
      renderComponent: MyCheckboxComponent,
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

  
  ngOnInit() {
    
    //this.societe$ = this.Ser.getData();
    this.societeService.getData().subscribe((data)=>{
      console.log('heeeey')
      this.societes=data;
      const optionGroups = data.map((societe) => ({
        title: societe.title,
        uniops: societe.uniops,
      }));
      console.log('optionGroups', optionGroups);
    
      this.fields.find((field) => field.name === 'uniop').optionGroups = optionGroups;
    })
  
    this.loadTableData();
    this.selectedOptions = [this.cols.firstname.title,this.cols.lastname.title];
    this.onSelectChange()
    
    
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
    console.log('checkpoint',this.formData)
    this.dialogService.open(ModalFormComponent, {
      context: {
        dialogTitle: 'Add Item',
        action: 'add',
        customTableService: this.customTableService,
        extra:this.extra,
        fields:this.fields,
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
      this.loadTableData();
    })
    }
}
