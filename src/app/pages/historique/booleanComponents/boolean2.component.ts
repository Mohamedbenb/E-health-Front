import { Component, Input, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { DeclarationService } from '../../../services/declaration.service';

@Component({
  template: `
   <nb-select [selected]="s" (selectedChange)="onChange($event)">
      <nb-option [value]="true">Oui</nb-option>
      <nb-option [value]="false">Non</nb-option>
    </nb-select>
  `,
})
export class BooleanComponent2  implements OnInit {
@Input() newValue: string;
@Input() rowData:any
s:boolean
constructor(private decalartionsService: DeclarationService){}
  ngOnInit(): void {
    
    this.s = this.rowData?.diagnosticcnam
  }
  
  
  
    onChange(value: any) {
    this.rowData.diagnosticcnam=value
    this.decalartionsService.updateData(this.rowData,this.s).subscribe((response)=>{
        console.log(response)
    })
     
      console.log('cell from custom boolean field')
      console.log('value from custom boolean field',this.rowData)
    }
  }