import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actionSettings } from '../../constants';
import { LocalDataSource } from 'ng2-smart-table';
import { VisiteService } from '../../services/service-visite.service';
import { DeclarationService } from '../../services/declaration.service';
import { stringify } from 'querystring';

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  tableData=new LocalDataSource;

   @Input() rowdata:any
  col1 = {
    
    matricule: {
      title: 'Matricule',
      type: 'string',
      hide:false},
    employee: {
      title: 'Nom et prénom',
      type: 'string',
      hide:false
      
    },
    datevalidation: {
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

    recommandation: {
      title: 'Unité opérationelle',
      type: 'string',
      hide:false
      
    },

  }
  col2={
    
    tableau: {
      title: 'Tableau',
      type: 'string',
      hide:false
      
    },
    matricule: {
      title: 'Matricule',
      type: 'string',
      hide:false},

    employee: {
      title: 'Nom et prénom',
      type: 'string',
      hide:false
      
    },

    dateDec: {
      title: 'Date de la déclaration',
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

    constat: {
      title: 'Constation médicale',
      type: 'string',
      hide:false
      
    },

  }
  columnsExam={
    
    matricule: {
      title: 'Matricule',
      type: 'string',
      hide:false
      
    },
    employee: {
      title: 'Nom et prénom',
      type: 'string',
      hide:false
      
    },
  
  dateValidation: {
    title: 'Date de validation',
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
    title: 'Date du rappel',
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
  
  selectedOptions: any[] = [];
settings:any

  allColumns = Object.keys(this.col1).map(key => {
  const column = this.col1[key];
  return {
    title: column.title,
    type: column.type,
    renderComponent: column.renderComponent || null, // check for custom component
  };
});
visites:any[]
visiteModel:{recommandation:string, datevalidation:Date, employee:string}[]=[]
data:any
source:any;
tabModel:{tableau:string, dateDec:Date, employee:string, constat:string}[]=[]
examModel:{employee:string, dateValidation:Date, rappel:Date,recommendation:string,}[]=[]
  constructor(private route: ActivatedRoute, private visiteService: VisiteService, private declarationService: DeclarationService) { }

  ngOnInit(): void {

    this.data=JSON.parse(localStorage.getItem('data'))
    this.source=localStorage.getItem('source')
    console.log('Received data:', this.data);
    console.log('Received data: source', this.source);
    
    
    switch(this.source){
    case 'visite':
       
     {   if(this.data)
      {
        const id = this.data.id
        
        this.visiteService.getbyTypeVis(id).subscribe((data)=>{
          console.log('data received', data);
          data.forEach(element =>{
            const item={recommandation:element.recommendation, datevalidation:element.dateValidation, employee:element.employee.firstname+' '+element.employee.lastname, matricule:element.employee.matricule}
            this.visiteModel.push(item)
          })
          console.log('table model ',this.visiteModel)
          
          this.tableData=new LocalDataSource(this.visiteModel)
          console.log('table data',this.tableData)  
      })
  
    
    
  };} 
  this.settings = {
    columns: this.col1,
    
    ...actionSettings
    } 
  break
  case 'tableau':  
  {   if(this.data)
    {
      const id = this.data.id
      
      this.declarationService.getData(id).subscribe((data)=>{
        console.log('data received', data);
        console.log('data received', data.dateDec);
        data.forEach(element =>{
          console.log(element)
          const item={tableau:element.mal.title, dateDec:element.dateDec, employee:element.emp.firstname+' '+element.emp.lastname, constat:element.constat, matricule:element.emp.matricule}
          console.log(item)
          this.tabModel.push(item)
        })
        console.log('table model ',this.tabModel)
        
        this.tableData=new LocalDataSource(this.tabModel)
        console.log('table data',this.tabModel) 

    })
  
  
};}      this.settings = {
        columns: this.col2,
        
        ...actionSettings
        } 
    break
  case'exam': 
  console.log(this.data)
  this.data?.exams.forEach(element=>{
    const item={employee:element.employee.firstname+' '+element.employee.lastname, dateValidation:element.dateValidation, rappel:element.rappel,recommendation:element.recommendation, matricule:element.employee.matricule}
    console.log('Exam Item',item)
    this.examModel.push(item)
    
  })
  this.tableData=new LocalDataSource(this.examModel)
  this.settings={
    columns:this.columnsExam,
    ...actionSettings
  }
    break
  default:
    
}
    
  }

}
