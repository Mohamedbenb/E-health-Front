import { Component, OnInit } from '@angular/core';
import { SocieteService } from '../../../services/societe.service';
import { VisiteService } from '../../../services/service-visite.service';
import { FormControl } from '@angular/forms';
import { Visite } from '../../../models/Visite';

@Component({
  selector: 'ngx-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss']
})
export class VisiteComponent implements OnInit {
  visites:Visite[] = [];
  ex:any
  selectedItemFormControl:FormControl
  selectedVisite=new Visite
  apteAuPoste: boolean = false;
  amenagementPoste: boolean = false;
  changementPoste: boolean = false;
  inapteTemporaire: boolean = false;
  inapteDefinitif: boolean = false;
  
  apteAuPosteDetails: string = '';
  amenagementPosteDetails: string = '';
  changementPosteDetails: string = '';
  inapteTemporairePeriod: string = '';
  inapteDefinitifReason: string = '';
  constructor(private Service: SocieteService,
              private visiteService: VisiteService,
    ) {}

   ngOnInit() {

    this.getvisites()
  }

getvisites()
{
  this.visiteService.getAllunv().subscribe((data: Visite[])=>{
    this.visites=data
    console.log('done?',this.visites)
  })
}
onChange(event:any){
  console.log(event)
  this.selectedVisite=event
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
  const combinedText = this.getCombinedText();
  console.log(combinedText)
  this.visiteService.vaidate(this.selectedVisite.id,combinedText).subscribe(() => {
    console.log('success')
  }, (error) => {
    console.error('Error updating table data:', error);
  });
}
}
