import { Component, OnInit} from '@angular/core';
import {  NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomTableService} from '../../../custom-table.service';
import { ModalFormComponent } from '../../ModalForm/ModalFormComponent';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: 'form-layouts.component.html',
})
export class FormLayoutsComponent implements OnInit{
  //modalForm: FormGroup;
  tableData: LocalDataSource;
  settings = {
    actions: {
      add:true,
      edit: true,
      delete: true,
      
      
    },
    mode:'external',
    columns: {

      firstname: {
        title: 'Nom',
        type: 'string',
        
      },
      lastname: {
        title: 'Prenom',
        type: 'string',
      },
      username: {
        title: 'Matricule',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },

    },
    
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      
    
  
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      

      
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,

    },

    

  
}

  constructor(private customTableService: CustomTableService,
              private dialogService: NbDialogService,
              
    ) {
    
  }
  ngOnInit() {
    this.loadTableData();
     
  }


  loadTableData() {
    this.customTableService.getTableData().subscribe((data) => {
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
        dialogData:tableData
      },}).onClose.subscribe(() => {
        console.log('updating')
        this.loadTableData();
      })
  }

  openAddDialog() {
    this.dialogService.open(ModalFormComponent, {
      context: {
        dialogTitle: 'Add Item',
        action: 'add',
      },}).onClose.subscribe(() => {
        console.log('updating')
        this.loadTableData();
      })
  }

  onEditClick(event: any) {
    console.log(event.data)
    // get the data of the selected row
    const tableData = event.data;
  
    // open the dialog with pre-filled fields
    this.dialogService.open(ModalFormComponent, {
      context: {
        dialogTitle: 'Edit Item',
        action: 'edit',
        dialogData: tableData,
      },
    },).onClose.subscribe(() => {
      console.log('updating')
      this.loadTableData();
    })
    console.log('Action:', );

  }

      


}







    
  
  

  