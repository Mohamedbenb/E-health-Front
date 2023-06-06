import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DefaultFilter  } from 'ng2-smart-table';

@Component({
  template: `
    <nb-select placeholder="Filtrer" [selected]="query" (selectedChange)="onChange($event)">
      <nb-option [value]="'true'">Oui</nb-option>
      <nb-option [value]="'false'">Non</nb-option>
    </nb-select>
  `,
})
export class FilterComponent extends DefaultFilter  implements OnChanges{
  query: string = '';

  onChange(value: any) {
    this.query = value;
    this.setFilter();
  }

  setFilter() {
    this.filter.emit(this.query);
  }
  ngOnChanges(changes: SimpleChanges): void {
   
  }
}
