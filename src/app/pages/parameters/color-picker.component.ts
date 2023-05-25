import { Component, Input, OnInit } from '@angular/core';
import { VisiteService } from '../../services/service-visite.service';
import { ColorService } from '../../services/color.service';
import { Color } from 'd3-color';

@Component({
  template: `
    <input type="color" [(ngModel)]="newValue"  (change)="onValueChanged()" />
  `,

})
export class ColorPickerCellComponent implements OnInit{

@Input() newValue: string;
@Input() rowData:any
color:Color
newColor:Color
  constructor(private typeservice: VisiteService,
              private colorService: ColorService          
    ) { }
    ngOnInit(): void {
      
      
        this.newValue=this.rowData.color?.primary
        

    }


  onValueChanged() {
    // Notify SmartTable that the cell value has changed
    console.log('this',this.rowData.color.id)
    this.newValue = this.newValue.toUpperCase();

    this.colorService.getuData(this.rowData.color.id).subscribe((data)=>
    {this.color = data,
    console.log('color',this.color)
    }
    
    )
    this.rowData.color.primary=this.newValue
    this.newColor=this.rowData.color
    console.log('new',this.rowData)
    console.log('new color',this.newColor)
    //this.typeservice.updateData(this.rowData,this.newValue).subscribe(() => {
    //    console.log('success')
    //  }, (error) => {
    //    console.error('Error updating table data:', error);
    //    
    //  });
    this.colorService.updateData(this.newColor).subscribe(()=>{
      console.log('success')
    },(error)=>{
      console.error('Error updating table data:', error);
    })
  }
}