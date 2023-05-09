import { ChangeDetectorRef, Component, ViewChild} from '@angular/core';


import { LocalDataSource } from 'ng2-smart-table';

import { UniopsComponent } from './UniopsComponent';

import {  FormGroup, Validators } from '@angular/forms';
import { SocieteService } from '../../services/societe.service';
import { SharedService } from '../../services/shared.service';
import { MalProfService } from '../../services/mal-prof.service';
import { actionSettings } from '../../constants';
import { ExamService } from '../../services/service-exam.service';
import { VisiteService } from '../../services/service-visite.service';


@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
})
export class ParametersComponent {
  formData = { title: '', mat: '', tel: '', fax: '',  adresse:'',codepostale:''};
  @ViewChild('uniops') uniopsComponent: UniopsComponent;
  tableData: LocalDataSource;
  tableData2: LocalDataSource;
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
  fields2 = [
    { name: 'title', type: 'text', title:'tableau', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'nbr', type: 'text', title:'prise en charge', validators: [Validators.required, Validators.minLength(1)] },
    { name: 'effects', type: 'text', title:'Liste des Effets', validators: [Validators.required,  Validators.minLength(2)] },
    { name: 'design', type: 'text', title:'Désignation des maladies', validators: [Validators.required,  Validators.minLength(4)] },


  ];
  fields3 = [
    { name: 'title', type: 'text', title:'tableau', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'frequence', type: 'text', title:'fréquence', validators: [Validators.required, Validators.minLength(1)] },
    { name: 'dateec', type: 'date', title:'Liste des Effets', validators: [Validators.required,  Validators.minLength(2)] },


  ];
  fields4 = [
    { name: 'type', type: 'text', title:'type', validators: [Validators.required, Validators.minLength(2)] },
    { name: 'frequency', type: 'text', title:'fréquence', validators: [Validators.required, Validators.minLength(1)] },
    { name: 'remarque', type: 'text', title:'Remarque', validators: [Validators.required,  Validators.minLength(2)] },


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
        this.loadTableData(this.getService())
      });
      }
    },

  }
  cols2={
    title: {
      title: 'Tableau',
      type: 'string',
    },
    design: {
      title: 'Désignation des maladies',
      type: 'string',
      
    },
    nbr: {
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
    type: {
      title: 'Type',
      type: 'string',
      
    },
    frequency: {
      title: 'Fréquence',
      type: 'number',
    },
    remarque: {
      title: 'Remarque',
      type: 'string',
      
    },
  }

  constructor(private Service: SocieteService,
              private SharedService: SharedService,
              private servmal: MalProfService,
              private servx: ExamService,
              private servv: VisiteService,
              
    ) {

  }
  tabs = [
    { title: 'Sociétés', id: 'tab1' },
    { title: 'Maladies professionnelles', id: 'tab2' },
    { title: 'Examens complémentaires', id: 'tab3' },
    { title: 'Suivi Médicale Spéciale', id: 'tab4' }
  ];
  selectedTabIndex='tab1';
  
  settings=this.SharedService.getSettings(this.cols1)
  ngOnInit() {
    
    console.log("ex",this.extra)
    console.log("aaad",this.settings);

    }


    async onTabChanged(event: any) {
      try {
        this.selectedTabIndex = event.tabId;
        const cols = await this.getCols();
        this.settings = this.SharedService.getSettings(cols);
        
        this.loadTableData(this.getService());
        console.log('cols', cols);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    loadTableData(serv:any) {
      this.SharedService.loadTableData(serv).subscribe((dataSource: LocalDataSource) => {
        this.tableData = dataSource;
        console.log('done')
        //this.cdr.detectChanges();
      });
    }

  onCustomEvent(event: any) {
    console.log('Custom event received in ParentComponent:', event);
    console.log("event emitted")
  }

  onDeleteConfirm(event: any): void {
    this.SharedService.onDeleteConfirm( event,this.getService(), this.extra).subscribe(() => {
      console.log('dialog closed'); 
      this.loadTableData(this.getService())
      })
  }

  openAddDialog(): void {
    this.SharedService.openAddDialog(this.getService(), this.getFields(), this.extra, this.modalForm).subscribe(() => {
      console.log('dialog closed'); 
      this.loadTableData(this.getService())
    });
  }

  onEditClick(event: any) {
    this.SharedService. onEditClick(event,this.getService(), this.getFields(), this.extra, this.modalForm).subscribe(() => {
      console.log('dialog closed'); 
      this.loadTableData(this.getService())
    });
}

private getService():any{
  switch (this.selectedTabIndex) {
    case 'tab1':
      return this.Service;
    case 'tab2':
      return this.servmal;
    case 'tab3':
      return this.servx;
    case 'tab4':
      return this.servv;
    default:
      throw new Error('Invalid tab index');
  }
}
private getFields():any{
  switch (this.selectedTabIndex) {
    case 'tab1':
      return this.fields;
    case 'tab2':
      return this.fields2;
    case 'tab3':
      return this.fields3;
    case 'tab4':
      return this.fields4;
    default:
      throw new Error('Invalid tab index');
  }
}
private getCols(): Promise<any> {
  console.log('tabnum',this.selectedTabIndex)
  return new Promise((resolve, reject) => {
    switch (this.selectedTabIndex) {
      case 'tab1':
        resolve(this.cols1);
        break;
      case 'tab2':
        resolve(this.cols2);
        break;
      case 'tab3':
        resolve(this.cols3);
        break;
      case 'tab4':
        resolve(this.cols4);
        break;
      default:
        reject('Invalid tab index');
    }
  });
}



}

