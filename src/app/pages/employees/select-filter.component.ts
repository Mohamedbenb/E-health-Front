// import { Component, Input } from '@angular/core';
// import { DefaultFilter  } from 'ng2-smart-table';
// import { filter } from 'rxjs-compat/operator/filter';

// @Component({
//   template: `
//     <select [(ngModel)]="query" (change)="filter()">
//       <option value="">All</option>
//       <option *ngFor="let option of options" [value]="option.value">{{ option.title }}</option>
//     </select>
//   `,
// })
// export class SelectFilterComponent extends DefaultFilter  {
//   @Input() options: any[];

// //   filter() {
// //     this.query = this.query.trim().toLowerCase();
// //     this.setFilter();
// //   }
// }
// filter