import { Component, OnInit } from '@angular/core';
import { SocieteService } from '../../services/societe.service';
import { VisiteService } from '../../services/service-visite.service';
import { FormControl } from '@angular/forms';
import { Visite } from '../../models/Visite';
import { Router } from '@angular/router';
import { ExamensComplementairesService } from '../../services/examens-complementaires.service';
import { Examen } from '../../models/Examen';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'ngx-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss']
})
export class VisiteComponent implements OnInit {
  visites:Visite[] = [];
  choice:any
  ex:any
  examens:Examen[]=[]
  selectedItemFormControl:FormControl
  selectedVisite: Visite
  selectedExam:Examen
  apteAuPoste: boolean = false;
  amenagementPoste: boolean = false;
  changementPoste: boolean = false;
  inapteTemporaire: boolean = false;
  inapteDefinitif: boolean = false;
  dateFormControl=new FormControl(new Date());
  recommendationFormControl=new FormControl();
  apteAuPosteDetails: string = '';
  amenagementPosteDetails: string = '';
  changementPosteDetails: string = '';
  inapteTemporairePeriod: string = '';
  inapteDefinitifReason: string = '';
  examRequest:{recommandation:string, dateReport:Date}
  constructor(private Service: SocieteService,
              private visiteService: VisiteService,
              private router: Router,
              private examCompService: ExamensComplementairesService,
              private calendarService: CalendarService,
    ) {}

   ngOnInit() {
    this.examRequest={recommandation:'', dateReport: new Date()}
    this.getvisites()
    this.getExamens()
  }

getvisites()
{
  this.visiteService.getAllunv().subscribe((data: Visite[])=>{
    this.visites=data
    console.log('done?',this.visites)
  })
}
getExamens(){
  this.examCompService.getAllunv().subscribe((response:Examen[])=>{
    this.examens=response;
    console.log('done?',this.examens)
  })
}
typeRdv(event){
  this.choice=event
}
onChange(event:any){
  console.log(event)
  this.selectedVisite=event
  console.log(this.selectedVisite)
}
onChangeExam(event:any){
  console.log(event)
  this.selectedExam=event
  console.log(this.selectedVisite)
}
getCombinedText(): string {
  let combinedText = '';
  if (this.apteAuPoste) {
    combinedText += 'Apte au poste: ' + this.apteAuPosteDetails;
  }
  if (this.amenagementPoste) {
    combinedText += 'Apte avec aménagement du poste: ' + this.amenagementPosteDetails;
  }
  if (this.changementPoste) {
    combinedText += 'Apte avec changement de poste: ' + this.changementPosteDetails;
  }
  if (this.inapteTemporaire) {
    combinedText += 'Inapte temporaire au poste: ' + this.inapteTemporairePeriod;
  }
  if (this.inapteDefinitif) {
    combinedText += 'Inapte définitif à tout poste du travail dans l\'entreprise: ' + this.inapteDefinitifReason;
  }
  return combinedText;
}

onSubmit(){
  let datas:{res : Visite [], index: number}
  const combinedText = this.getCombinedText();
  console.log(combinedText)
  this.visiteService.vaidate(this.selectedVisite.id,combinedText).subscribe((data:Visite[]) => {
    console.log('success',data)

    this.calendarService.triggerNewItemAdded()
    this.router.navigate(['pages/historique'], { state: data });
  }, (error) => {
    console.error('Error updating table data:', error);
  });
}
datas:any
onSubmitExam(){
  
this.examRequest.recommandation=this.recommendationFormControl.value
this.examRequest.dateReport=this.dateFormControl.value
this.examCompService.validate(this.selectedExam.id,this.examRequest).subscribe((data)=>{
const index=1;
this.datas=data;
this.datas.index=index
  console.log('response',data)
  this.calendarService.triggerNewItemAdded()
  this.router.navigate(['pages/historique'], { state: data });
},(error)=>{
  console.log(error)
})
}
}
