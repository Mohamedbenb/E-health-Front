import { Component, OnInit } from '@angular/core';
import { VisiteService } from '../../services/service-visite.service';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { Societe } from '../../models/Societe';
import { SocieteService } from '../../services/societe.service';
import { TypeExamService } from '../../services/type-exam.service';

@Component({
  selector: 'ngx-chartjs',
  styleUrls: ['./statistics.component.scss'],
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit{
  typevis: any;
  data: any;
  options: any;
  typeExam:any
  themeSubscription: any;
   years: number[] = [];
   dataPoints: number[] = [];
   colors: any
   chartjs: any
   selectedOption: any;
   societes:Societe
   uniopid:number
  constructor(private theme: NbThemeService, private visiteService: VisiteService, private societeService: SocieteService, private typeExamService: TypeExamService){}
  ngOnInit(): void {
    this.visiteService.getData().subscribe((data)=>{
      console.log(data)
      this.typevis = data
      this.selectedOption = this.typevis[0];
      console.log('this.select',this.selectedOption)
      this.fetchDataAndGenerateChart(this.selectedOption);
    })
    
    this.societeService.getData().subscribe((response)=>{
      console.log('initiated3')
      this.societes=response;
    })
    this.typeExamService.getData().subscribe((response)=>{
      this.typeExam=response;
      console.log('type examen',this.typeExam)
    })
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

    this.colors = config.variables;
    this.chartjs = config.variables.chartjs;
      
  
      
      
      

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        
        legend: {
          labels: {
            fontColor: this.chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: this.chartjs.axisLineColor,
              },
              ticks: {
                fontColor: this.chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: this.chartjs.axisLineColor,
              },
              ticks: {
                fontColor: this.chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }
  selectchange(){
    
  }
  selectUniOp(uniop: any) {
    console.log('Selected uniop:', uniop);
    this.uniopid = uniop;
    
  
  }
  typeRdv(event:any){
    
  }
      
  fetchDataAndGenerateChart(data:any) {
    console.log('data',data)
    this.visiteService.getbyTypeVis(data.id).subscribe((response: any[]) => {
      const years: number[] = [];
      const dataPoints: number[] = [];

      response.forEach((item: any) => {
        const year = new Date(item.dateValidation).getFullYear();
        if (!years.includes(year)) {
          years.push(year);
        }
      });
      years.sort((a, b) => a - b);
      years.forEach((year) => {
        const count = response.filter((item) => new Date(item.dateValidation).getFullYear() === year).length;
        dataPoints.push(count);
      });

      this.data = {
        labels: years.map((year) => year.toString()),
        datasets: [
          {
            data: dataPoints,
            label: `${data.type}`,
            backgroundColor: NbColorHelper.hexToRgbA(this.colors.primaryLight, 0.8),
          },
        ],
      };
    });
  }
  
}
