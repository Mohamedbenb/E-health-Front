import { Component, Input, ViewChild } from '@angular/core';
import { NbDatepicker, NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { ModalFormComponent } from '../../ModalForm/ModalFormComponent';
import { SmartTableData } from '../../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomTableService } from '../../../custom-table.service';
import { GridService } from './GridService';
import { UniopsComponent } from './UniopsComponent';
import { actionSettings } from '../../../constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent {
  formData = { title: '', mat: '', tel: '', fax: '',  adresse:'',codepostale:''};
  tableData: LocalDataSource;
  modalForm: FormGroup;
  extra=41;
  fields = [
    { name: 'title', type: 'text', title:'Nom', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'adresse', type: 'text', title:'Adresse', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'codepostale', type: 'text', title:'Codepostale', validators: [Validators.required, Validators.email] },
    { name: 'tel', type: 'number', title:'Tel', validators: [Validators.required, Validators.minLength(8)]},
    { name: 'fax', type: 'number', title:'Fax', validators: [Validators.required, Validators.minLength(8)]},
    { name: 'mat', type: 'number', title:'Matricule', validators: [Validators.required, Validators.minLength(8)]},
  ];
  cols1={

    title: {
      title: 'Nom',
      type: 'string',
      
    },
    mat: {
      title: 'Matricule CNSS',
      type: 'string',
    },
    tel: {
      title: 'Tel',
      type: 'number',
    },
    fax: {
      title: 'Fax',
      type: 'number',
    },
    adresse: {
      title: 'Adresse',
      type: 'string',
    },
    codepostale: {
      title: 'Code Postale',
      type: 'number',
    },
    Uniops: {
      title: 'Unités opérationelles',
      type: 'custom',
      renderComponent: UniopsComponent,
    },

  }
  cols2={
    title: {
      title: 'Désignation des maladies',
      type: 'string',
      
    },
    pench: {
      title: 'Délai de prise en charge',
      type: 'number',
    },
    effects: {
      title: 'Liste indicative des principaux travaux susceptibles de provoquer ces maladies',
      type: 'string',
      
    },
  }
  cols3={
    title: {
      title: 'Type',
      type: 'string',
      
    },
    frequence: {
      title: 'Fréquence',
      type: 'number',
    },
    dateec: {
      title: 'Date',
      type: 'string',
      
    },
  }
  cols4={
    title: {
      title: 'Type',
      type: 'string',
      
    },
    frequence: {
      title: 'Fréquence',
      type: 'number',
    },
    remarque: {
      title: 'Remarque',
      type: 'string',
      
    },
  }
  settings1 = {
  columns: this.cols1,
    
  ...actionSettings
}
settings2={
  columns: this.cols2,
    
  ...actionSettings
}
settings3={
  columns: this.cols3,
    
  ...actionSettings
}
settings4={
  columns: this.cols4,
    
  ...actionSettings
}
  constructor(private Service: GridService,
              private dialogService: NbDialogService,
              private formBuilder: FormBuilder
              
    ) {

  }
  ngOnInit() {
    this.loadTableData();
    console.log("ex",this.extra)
    
     
  }


  loadTableData() {
    this.Service.getTableData().subscribe((data) => {
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
        customTableService: this.Service
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
        formData: this.formData,
        customTableService: this.Service,
        fields:this.fields,
        extra:this.extra,
        modalForm:this.modalForm
      },}).onClose.subscribe(() => {
        console.log('updating')
        this.loadTableData();
      })
  }

  onEditClick(event: any) {
    //console.log("ev",event.data)
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
        customTableService: this.Service,
        fields:this.fields,
        extra:this.extra,
        modalForm:this.modalForm
      },
    },).onClose.subscribe(() => {
      console.log('updating',this.tableData)
      this.loadTableData();
    })
}

}




