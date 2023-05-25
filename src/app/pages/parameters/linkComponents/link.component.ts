import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-details',
  template:`<a [routerLink]="['../../pages/details']" [state]="{data:rowData, source:'visite'}" (click)="setData($event)" class="link-style">{{ value }}</a>
  `,

})
export class LinkComponent implements OnInit, ViewCell {
  @Input() value: any;
  @Input() rowData: any;
  @Input() Status: any;
  constructor(private router: Router) { }
  navigateToDetails(data: any): void {
    this.router.navigate(['/pages/details'], { queryParams: { data: JSON.stringify(data) } });
  }
  ngOnInit(): void {
    //console.log(this.rowData)
    //console.log('2',typeof(this.rowData.type))

  }
  
  setData(event){
    console.log('event',event)
    localStorage.setItem('data',JSON.stringify(this.rowData))
    localStorage.setItem('source','visite')
    console.log('retrieved',JSON.parse(localStorage.getItem('data')))
    console.log('retrieved',localStorage.getItem('source'))
  }
}
