import { Component, Input, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { DeclarationService } from '../../../services/declaration.service';

@Component({
  template: `
   <nb-select [selected]="rowData.reponsecnam" (selectedChange)="onChange($event)">
      <nb-option [value]="Resp[0]">Accepté</nb-option>
      <nb-option [value]="Resp[1]">Refusé</nb-option>
      <nb-option [value]="Resp[2]">Sans réponse</nb-option>
    </nb-select>
  `,
})
export class ResponseComponent  implements OnInit {
@Input() newValue: string;
@Input() rowData:any
s:boolean
Resp=['Accepted','Denied','No response']
  constructor(private decalartionsService: DeclarationService){}
  ngOnInit(): void {
    
    this.s = this.rowData?.depotcnam
  }
  
  
  
    onChange(value: any) {
    this.rowData.reponsecnam=value
    this.decalartionsService.updateData(this.rowData,this.s).subscribe((response)=>{
        console.log(response)
    })
     
      console.log('cell from custom boolean field')
      console.log('value from custom boolean field',this.rowData)
    }

  }

  // ngOnInit(): void {
  //   //throw new Error('Method not implemented.');
  // }
  // @Input() newValue: string;
  // @Input() rowData:any
    
  
  //   onChange(value: any) {
      
     
  //     console.log('cell from custom boolean field')
  //     console.log('value from custom boolean field',this.rowData)
  //   }