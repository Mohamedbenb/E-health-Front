import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-option',
  template: `
    <nb-option [value]="value">
      {{ label }}
      <span class="badge">{{ badgeValue }}</span>
    </nb-option>
  `,
  styleUrls: ['./custom-option.component.scss'],
})
export class CustomOptionComponent implements OnInit{

  @Input() value: 'value';
  @Input() label: 'label';
  @Input() badgeValue: 'badgeValue';
  ngOnInit(): void {
    console.log('value',this.value)
    console.log('label',this.label)
    console.log('badgeValue',this.badgeValue)
}
}
