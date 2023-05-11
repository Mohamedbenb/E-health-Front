import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbOptionComponent, NbStepChangeEvent } from '@nebular/theme';
import { EmployeeService } from '../../services/employee.service';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Societe } from '../../models/Societe';
import { SocieteService } from '../../services/societe.service';
import { Employee } from '../../models/Employee';
import { UniOp } from '../../models/UniOp';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent implements OnInit{
  societe: Societe [];
  selectedName: string;
  selectedIndex: number;
  current:any
  filteredGroups$: Observable<Societe[]>;
  inputFormControl: FormControl;
  uniopid:any
  value: String
  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>,
    private socser: SocieteService,
    private empser: EmployeeService) {}
  ngOnInit(): void {
    this.inputFormControl = new FormControl();
    //this.inputFormControl.setValue(this.getValueToDisplay());
    this.socser.getData().subscribe((data) => {
      this.societe = data;
      console.log(this.societe);
      this.filteredGroups$ = this.inputFormControl.valueChanges.pipe(
        startWith(''),
        map((selectedOption) => {
          const filterString = typeof selectedOption === 'string' ? selectedOption : selectedOption.title.toString();
          console.log('selectedOption.title',selectedOption.title)
          console.log('filterString',filterString)
          
          return this.filter(filterString);
        })
      );
      
    });
  
  }

  private filter(value: string): Societe[] {
    const filterValue = value ? value.toLowerCase() : '';
    return this.societe
      .map((societe) => {
        return {
          id: societe.id,
          title: societe.title,
          mat: societe.mat,
          tel: societe.tel,
          fax: societe.fax,
          adresse: societe.adresse,
          codepostale: societe.codepostale,
          uniops: societe.uniops.filter(u =>
            typeof u.title === 'string' &&  u.title.toString().toLowerCase().includes(filterValue))
         ,
        };
      })
      .filter((societe) => societe.uniops.length);
  }

  trackByFn(item) {
    return item.id;
  }




  cancel() {
    this.ref.close();
  }

  onOptionSelectionChange(uniop: any) {
    console.log('Selected uniop:', uniop);
    this.uniopid=uniop.id
    // Perform further operations with the selected uniop object
  }

  

  
  changeEvent: NbStepChangeEvent;

  handleStepChange(e: NbStepChangeEvent): void {
    this.changeEvent = e;
    console.log(e)
    if (e.index==1){

      console.log('What are you doing step change?',this.uniopid)
      this.empser.getbyuni(this.current.id).subscribe((data)=>{
        console.log(data)
      })
    }
    if (e.index==2){
        
    }
  }
}
