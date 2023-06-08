import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-Reshum',
  template: `
    <div>
    {{ reshum }}
    </div>
  `,
})
export class ReshumComponent {


  @Input() reshum: string;

}

