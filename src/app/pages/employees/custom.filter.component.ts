import { Component } from '@angular/core';
import { DefaultFilter } from 'ng2-smart-table';

@Component({
  template: `
 
  `,
})
export class CustomFilterComponent extends DefaultFilter {
  selectedValue: any = '';

  filterFunction(): void {
    this.query = this.selectedValue;
    this.setFilter();
  }
}
