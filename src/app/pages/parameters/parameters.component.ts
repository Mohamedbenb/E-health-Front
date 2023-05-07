import { Component, ViewChild} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ModalFormComponent } from '../ModalForm/ModalFormComponent';

import { LocalDataSource } from 'ng2-smart-table';

import { UniopsComponent } from './UniopsComponent';
import { actionSettings } from '../../constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocieteService } from '../../services/societe.service';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
})
export class ParametersComponent {
  formData = { title: '', mat: '', tel: '', fax: '',  adresse:'',codepostale:''};
  @ViewChild('uniops') uniopsComponent: UniopsComponent;
  tableData: LocalDataSource;
  modalForm: FormGroup;
  extra=41;
  fields = [
    { name: 'title', type: 'text', title:'Nom', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'adresse', type: 'text', title:'Adresse', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'codepostale', type: 'text', title:'Codepostale', validators: [Validators.required,  Validators.minLength(2)] },
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
      width: '400px',
      renderComponent: UniopsComponent,
      onComponentInitFunction: (instance) => {
      instance.customEvent.subscribe(() => {
        console.log('Custom event emitted from UniopsComponent');
        this.loadTableData()
      });
      }
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

  constructor(private Service: SocieteService,
              private dialogService: NbDialogService,
              private SharedService: SharedService
              
    ) {

  }
  tabs = [];
  sett:any
  sett2:any
  sett3:any
  sett4:any
  ngOnInit() {
    this.loadTableData();
    console.log("ex",this.extra)
    this.sett=this.SharedService.getSettings(this.cols1)
    this.sett2=this.SharedService.getSettings(this.cols2)
    this.sett3=this.SharedService.getSettings(this.cols3)
    this.sett4=this.SharedService.getSettings(this.cols4)
    console.log("aaad",this.sett)
    }
    loadTableData() {
      this.SharedService.loadTableData(this.Service).subscribe((dataSource: LocalDataSource) => {
        this.tableData = dataSource;
        console.log('done')
      });
    }
  onCustomEvent(event: any) {
    console.log('Custom event received in ParentComponent:', event);
    console.log("event emitted")
  }

  onDeleteConfirm(event: any): void {
    this.SharedService.onDeleteConfirm( event,this.Service, this.extra).subscribe(() => {
      console.log('dialog closed'); 
      this.loadTableData()
      })
  }

  openAddDialog(): void {
    this.SharedService.openAddDialog(this.Service, this.fields, this.extra, this.modalForm).subscribe(() => {
      console.log('dialog closed'); 
      this.loadTableData()
    });
  }

  onEditClick(event: any) {
    this.SharedService. onEditClick(event,this.Service, this.fields, this.extra, this.modalForm).subscribe(() => {
      console.log('dialog closed'); 
      this.loadTableData()
    });
}

}




