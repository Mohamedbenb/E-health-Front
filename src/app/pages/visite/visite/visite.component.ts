import { Component, OnInit } from '@angular/core';
import { SocieteService } from '../../../services/societe.service';

@Component({
  selector: 'ngx-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss']
})
export class VisiteComponent implements OnInit {
  societes:[]
  ex:any
  constructor(private Service: SocieteService) {}

   ngOnInit() {
    this.Societes();
    console.log(this.societes)
  }
  Societes() {
    this.Service.getData().subscribe((data) => {
    this.societes=data
    console.log("2",this.societes)
    
  }, (error) => {  
    console.error('Error loading table data:', error);
    });
    
  }

}
