import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  template: `
    <nb-select [placeholder]="placeholde" (selectedChange)="onSelectedChange($event)">
      <ng-content></ng-content>
    </nb-select>
  `,
  
})
export class CustomSelectComponent implements OnInit {
  @Input() placeholde: string;

  constructor() {}

  ngOnInit(): void {}

  onSelectedChange(event: any): void {
    console.log('Selected value:', event);
  }
}
