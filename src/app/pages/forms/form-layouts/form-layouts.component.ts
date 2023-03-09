import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogConfig, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';


import { CustomTableService} from '../../../custom-table.service';

import { ModalFormComponent } from '../../ModalForm/ModalFormComponent';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: 'form-layouts.component.html',
})
export class FormLayoutsComponent implements OnInit{
  modalForm: FormGroup;
  settings = {
    actions: {
      add:true,
      edit: true,
      delete: true,
      
      
    },
    mode:'external',
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
      },
      firstname: {
        title: 'First Name',
        type: 'string',
      },
      lastname: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
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
      mode: 'external', // open the dialog in external mode
      onEdit: (event: any) => this.onEditClick(event),

      
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,

    },

    

  
}
source: LocalDataSource = new LocalDataSource();
tableData: any[] = [];
  constructor(private customTableService: CustomTableService,
              private dialogService: NbDialogService,
              
    ) {
    
  }
  ngOnInit() {
    this.loadTableData();
     
  }

  loadTableData() {
    this.customTableService.getTableData().subscribe((data) => {
      this.tableData=data;
      this.source = data;
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
    // get the data of the selected row
    const tableData = event.data;
  
    // open the dialog with pre-filled fields
    this.dialogService.open(ModalFormComponent, {
      context: {
        dialogTitle: 'Edit Item',
        action: 'edit',
        dialogData: tableData,
      },
    }).onClose.subscribe(() => {
      console.log('updating')
      this.loadTableData();
    })

  }

      


}







    
  
  

  