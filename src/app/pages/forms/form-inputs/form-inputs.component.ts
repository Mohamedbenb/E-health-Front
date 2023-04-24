import { Component } from '@angular/core';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {
  date = new Date();
  value:any;
  val2:any;
  val3:any;
  val4:any;
  chx1:boolean;
  chx2:boolean;
  chx3:boolean;
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  callme(event:any) {
    
    console.log("slfjklsd",this.value);
}
options = ['Option 1', 'Option 2', 'Option 3'];
selectedOption: string;

onOptionChange(event: any) {
  console.log('Selected option:', this.selectedOption);
}
}
