import { Component, OnInit } from '@angular/core';
import { GridService } from '../../tables/tree-grid/GridService';

@Component({
  selector: 'ngx-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss']
})
export class VisiteComponent implements OnInit {
  societes:[]
  ex:any
  constructor(private Service: GridService) {}

   ngOnInit() {
    this.Societes();
    console.log(this.societes)
  }
  Societes() {
    this.Service.getTableData().subscribe((data) => {
    this.societes=data
    console.log("2",this.societes)
    
  }, (error) => {  
    console.error('Error loading table data:', error);
    });
    
  }

}
