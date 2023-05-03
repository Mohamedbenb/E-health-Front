import { Component, OnInit} from '@angular/core';
import {  NbDialogService } from '@nebular/theme';
import { Cell, LocalDataSource } from 'ng2-smart-table';
import { CustomTableService} from '../../../custom-table.service';
import { ModalFormComponent } from '../../ModalForm/ModalFormComponent';
import { MyCheckboxComponent } from './chkboxComponent';
import { toArray } from 'rxjs-compat/operator/toArray';
import { actionSettings } from '../../../constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridService } from '../../tables/tree-grid/GridService';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: 'form-layouts.component.html',
})
export class FormLayoutsComponent implements OnInit{
  modalForm: FormGroup;
  formData = {firstname: '', matricule: '',status: false, lastname: '', email: '', datenai: new Date(),daterecru: new Date()};
  fields = [
    { name: 'firstname', type: 'text', title:'Prénom', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'lastname', type: 'text', title:'Nom', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'email', type: 'email', title:'Email', validators: [Validators.required, Validators.email] },
    { name: 'matricule', type: 'number', title:'Matricule', validators: [Validators.required, Validators.minLength(8)]},
    { name: 'datenai', type: 'nb-datepicker', title: 'Date de naissance', validators: [Validators.required] },
    { name: 'daterecru', type: 'nb-datepicker', title: "Date d'embauche", validators: [Validators.required] },
  ];
  extra=1;
  tableData: LocalDataSource;

  cols = {
    

    firstname: {
      title: 'Nom',
      type: 'string',
      show:true
      
    },
    lastname: {
      title: 'Prenom',
      type: 'string',
      show:false
    },
    matricule: {
      title: 'Matricule',
      type: 'number',
    },
    Status: {
      title: 'Status',
      type: 'custom',
      renderComponent: MyCheckboxComponent,
    },
    email: {
      title: 'E-mail',
      type: 'string',
      
    },
    age: {
      title: 'Age',
      type: 'number',
    },
    daterecru:{
      title:"Date d'embauche"
    }
  }
  
  selectedOptions: any[] = [];
  settings = {
    columns: this.cols,
    selectMode: 'multi',
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
              private formBuilder: FormBuilder,
             
              
    ) {

      
    
  }
  public displayedColumns: any[] = [];
  onSelectChange() {
    this.displayedColumns = this.allColumns.filter(column => {
      return this.selectedOptions.includes(column.title);
    }).map(column => column.title);
    
    //this.settings.columns = {};
    this.displayedColumns.forEach(columnTitle => {
      this.settings.columns[columnTitle] = this.allColumns.find(column => column.title === columnTitle);
    });
    
    console.log(this.displayedColumns)
    
  }
  
  ngOnInit() {
    this.loadTableData();
    console.log('cell:', this.allColumns);
    console.log(this.displayedColumns)

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
        modalForm:this.modalForm
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
        formData: this.formData,
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







    
  
  

  