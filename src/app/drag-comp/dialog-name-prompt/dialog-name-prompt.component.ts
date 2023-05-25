import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef, NbStepChangeEvent, NbStepperComponent } from '@nebular/theme';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Societe } from '../../models/Societe';
import { SocieteService } from '../../services/societe.service';
import { Employee } from '../../models/Employee';

import { Datecal } from '../../models/Datecal';
import { VisiteService } from '../../services/service-visite.service';
import { Color } from '../../models/Color';

import { TypeVisite } from '../../models/TypeVisite';

@Component({
  selector: 'ngx-dialog-name-prompt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent implements OnInit {
  
  selectedName: string;
  selectedIndex: number;
  selectedItems: { employee: Employee, visite: TypeVisite }[] = [];
  request:{employeeId:number, primaryTypeId:number, datevis:Datecal}[]=[]
  filteredOptions$: Observable<Employee[]>;
  inputFormControl: FormControl;
  employeeFormControl=new FormControl;
  dateFormControl=new FormControl(new Date());
  uniopid: any;
  typevis:any
  time = new FormControl(new Date());
  time2 = new FormControl(new Date())
  
  
  datecal=new Datecal;

  
  
  employees: Employee[];
  societes:Societe[]=[]
  selectedItemFormControl = new FormControl();
  @ViewChild('autoInput', { static: true }) autoInput: ElementRef<HTMLInputElement>;
  @ViewChild('stepper') stepper: NbStepperComponent;
  isLastStep: boolean = false;
  constructor(
    protected ref: NbDialogRef<DialogNamePromptComponent>,
    private societeService: SocieteService,
    private employeeService: EmployeeService,
    private viser: VisiteService,
  ) {}

  ngOnInit(): void {
    console.log('initiated')
    this.datecal.color = new Color();
    this.datecal.color.primary='';
  
    console.log('initiated2')
    this.societeService.getData().subscribe((response)=>{
      console.log('initiated3')
      this.societes=response;
    })
    this.viser.getData().subscribe((data)=>{
      console.log(data)
      this.typevis = data
    })
  }

  

  

  trackByFn(item) {
    return item.id;
  }

  cancel() {
    this.ref.close();
  }

  selectUniOp(uniop: any) {
    console.log('Selected uniop:', uniop);
    this.uniopid = uniop;
    this.getEmployees(this.uniopid.id)
  
  }
  getEmployees (id:any){
    console.log('called getEmployees')
    this.employeeService.getbyuni(id).subscribe((data)=>{
      this.employees=data;
      console.log('data',data);
      this.filteredOptions$ = this.employeeFormControl.valueChanges.pipe(
        startWith(''),
        map((selectedOption) => {
          const filterString =
            typeof selectedOption === 'string'
              ? selectedOption
              : selectedOption.firstname.toString();
          return this.employeeService.filterEmployees(filterString,this.employees);
        })
      );
    },(error)=>{
      console.error('error getting employees',error)
    });
  }



  changeEvent: NbStepChangeEvent;

  handleStepChange(e: NbStepChangeEvent): void {
    this.changeEvent = e;
    this.isLastStep = e.step === this.stepper.steps.last;
    console.log(e);
    
    if (e.index == 2) {
      // Handle step 2 change
    }
  }

  isSelected(option: { employee: Employee, visite: TypeVisite }): boolean {
    return this.selectedItems.some(item => item.employee === option.employee);
  }
  
  
  
  optionValue(event:any){
    const value = event.firstname +' '+ event.lastname
    return value;
  }
  toggleSelection(option: Employee, checked: boolean): void {
    this.selectedItemsState[option.id] = checked;
    console.log('option',option);
    console.log('checked',checked);
    console.log('called');
    if (checked) {
      const newItem = { employee: option, visite: null };

      this.selectedItems.push(newItem);
      console.log('selected items updated', this.selectedItems);
    } else {
      const index = this.selectedItems.findIndex((item) => item.employee=== option);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    }
  }

  
  

selectedItemsState: { [key: string]: boolean } = {};
  removeSelectedItem(item: { employee: Employee, visite: TypeVisite }): void {
    const index = this.selectedItems.indexOf(item);
    if (index !== -1) {
      this.selectedItems.splice(index, 1); 
      
      this.selectedItemsState[item.employee.id] = false;
    }
    console.log('this.selectedItems',this.selectedItems)
    
  }
  hasSelectedItems(): boolean {
    return this.selectedItems.length > 0;
  }
  datevalue= new Date()
  datevalue2= new Date()
  submit(){
    const isLastStep = this.stepper.selectedIndex === (this.stepper.steps.length - 1);
    if (isLastStep)
{    console.log(this.employeeFormControl)
    this.datevalue = this.dateFormControl.value;
    this.datevalue.setHours(this.time.value.getHours())
    this.datevalue.setMinutes(this.time.value.getMinutes())
    this.datevalue2 = this.dateFormControl.value;
    this.datevalue2.setHours(this.time2.value.getHours())
    this.datevalue2.setMinutes(this.time2.value.getMinutes())
    this.selectedItems.forEach((item)=>{
    
      const datevis = new Datecal
      datevis.color = new Color
      datevis.start=this.datevalue;
      datevis.end=this.datevalue2;
      datevis.title=item.visite.type+' '+item.employee.firstname + ' ' + item.employee.lastname
      console.log('item.visite.color.id',item.visite.color.id)
      datevis.color.id=0;
      datevis.color.id=item.visite.color.id
      
      const newItem = {employeeId:item.employee.id, primaryTypeId:item.visite.id, datevis:datevis}
      this.request.push(newItem) 
      })

    console.log('requestbody',this.request)
    
   
   
    this.viser.addDatav(this.request).subscribe(()=>{console.log('done');this.ref.close()})
    }
  }
  clicked(event:any){
    console.log(event)
  }
  
  
}

