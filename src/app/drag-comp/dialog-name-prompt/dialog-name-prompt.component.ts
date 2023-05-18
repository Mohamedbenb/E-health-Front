import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef, NbOptionComponent, NbStepChangeEvent, NbStepperComponent } from '@nebular/theme';
import { EmployeeService } from '../../services/employee.service';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Societe } from '../../models/Societe';
import { SocieteService } from '../../services/societe.service';
import { Employee } from '../../models/Employee';
import { UniOp } from '../../models/UniOp';
import { Datecal } from '../../models/Datecal';
import { VisiteService } from '../../services/service-visite.service';
import { Color } from '../../models/Color';

@Component({
  selector: 'ngx-dialog-name-prompt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent implements OnInit {
  societe: Societe[];
  selectedName: string;
  selectedIndex: number;
  current: any;
  filteredGroups$: Observable<Societe[]>;
  filteredOptions$: Observable<Employee[]>;
  inputFormControl: FormControl;
  employeeFormControl: FormControl;
  dateFormControl: FormControl;
  uniopid: any;
  value: String;
  employee: Employee[]=[];
  time : FormControl;
  time2 : FormControl;
  Form = new FormGroup({});
  datecalFormControl:FormControl
  datecal=new Datecal;
  date2:FormControl
  typevis:any
  empp:Employee
  
  selectedItemFormControl = new FormControl();
  @ViewChild('autoInput', { static: true }) autoInput: ElementRef<HTMLInputElement>;
  @ViewChild('stepper') stepper: NbStepperComponent;
  isLastStep: boolean = false;
  constructor(
    protected ref: NbDialogRef<DialogNamePromptComponent>,
    private socser: SocieteService,
    private empser: EmployeeService,
    private viser: VisiteService,
  ) {}

  ngOnInit(): void {
    this.datecal.color = new Color();
    this.datecal.color.primary=''
    this.inputFormControl = new FormControl('', Validators.required);
    this.employeeFormControl = new FormControl('',Validators.required);
    this.dateFormControl = new FormControl(new Date(),Validators.required)
    this.datecalFormControl = new FormControl(new Datecal,Validators.required)
    this.time = new FormControl(new Date(),Validators.required)
    this.time2 = new FormControl(new Date(),Validators.required)
    this.Form.addControl('employee',this.employeeFormControl)
    this.Form.addControl('datevis',this.datecalFormControl)
    this.Form.addControl('end', this.date2 =new FormControl(new Date(),Validators.required))
    this.Form.addControl('visite',this.selectedItemFormControl)
    this.socser.getData().subscribe((data) => {

      this.societe = data;
      this.filteredGroups$ = this.inputFormControl.valueChanges.pipe(
        startWith(''),
        map((selectedOption) => {
          const filterString =
            typeof selectedOption === 'string'
              ? selectedOption
              : selectedOption.title.toString();
          return this.filter(filterString);
        })
      );
    });
    this.viser.getData().subscribe((data)=>{
      console.log(data)
      this.typevis = data
    })
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
          uniops: societe.uniops.filter((u) =>
            typeof u.title === 'string' &&
            u.title.toString().toLowerCase().includes(filterValue)
          ),
        };
      })
      .filter((societe) => societe.uniops.length);
  }

  private filterEmp(value: string): Employee[] {
    console.log(this.employee)
    const filterValue = value ? value.toLowerCase() : '';
    return this.employee.filter((employee) => {
      const firstName = employee.firstname?.toLowerCase();
      const lastName = employee.lastname?.toLowerCase();
      return (
        (firstName && firstName.includes(filterValue)) ||
        (lastName && lastName.includes(filterValue))
      );
    });
  }

  trackByFn(item) {
    return item.id;
  }

  cancel() {
    this.ref.close();
  }

  onOptionSelectionChange(uniop: any) {
    console.log('Selected uniop:', uniop);
    this.uniopid = uniop;
    
    // Perform further operations with the selected uniop object
  }

  onChange() {
    const value = this.autoInput.nativeElement.value;
    this.filteredOptions$ = this.getFilteredOptions(value || '');
  }

  getFilteredOptions(value: string): Observable<Employee[]> {
    return of(value).pipe(map((filterString) => this.filterEmp(filterString)));
  }

  changeEvent: NbStepChangeEvent;

  handleStepChange(e: NbStepChangeEvent): void {
    this.changeEvent = e;
    this.isLastStep = e.step === this.stepper.steps.last;
    console.log(e);
    if (e.index == 1) {
      if (this.uniopid) {
        
        this.employeeFormControl = new FormControl();
        this.empser.getbyuni(this.uniopid.id).subscribe((data) => {
          this.employee = data;
          this.filteredOptions$ = this.employeeFormControl.valueChanges.pipe(
            startWith(''),
            map((selectedOption) => {
              const filterString =
                typeof selectedOption === 'string'
                  ? selectedOption
                  : selectedOption.firstname.toString();
              return this.filterEmp(filterString);
            })
          );
        });
      }
    }
    if (e.index == 2) {
      // Handle step 2 change
    }
  }

  onInputChange(value: string) {
    // Filter the options based on the input value
    this.filteredOptions$ = this.getFilteredOptions(value);
  }
  
  onSelectionChange(event: any) {
    const selectedName = event.option.value.firstname + ' ' + event.option.value.lastname;
    this.employeeFormControl.setValue(selectedName);
  }
  submit(){
    const isLastStep = this.stepper.selectedIndex === (this.stepper.steps.length - 1);
    if (isLastStep)
{    console.log(this.employeeFormControl)
    const datevalue = this.dateFormControl.value;
    datevalue.setHours(this.time.value.getHours())
    datevalue.setMinutes(this.time.value.getMinutes())
    const datevalue2 = this.dateFormControl.value;
    
    this.datecal.start=datevalue;
    this.datecal.end=datevalue2;
    this.datecal.title=this.selectedItemFormControl.value.type + '' + this.empp.firstname + ' ' + this.empp.lastname;
    this.datecal.color=this.selectedItemFormControl.value.color;
    console.log('this.selectedItemFormControl.value.color;', this.datecal.color.primary)
    datevalue.setHours(this.time2.value.getHours())
    datevalue.setMinutes(this.time2.value.getMinutes())
    this.Form.patchValue({employee:this.empp,
                          datevis:this.datecal,
                
    })
    this.Form.addControl('visite',this.selectedItemFormControl.value)
    console.log('visite',this.selectedItemFormControl.value)
    console.log('date',this.datecal)
    console.log('generatedvalue',this.uniopid)
    console.log('generatedform',this.Form.value)
    const ex ='aa'
    this.viser.addDatav(this.Form.value,ex).subscribe(()=>console.log('done'))
    this.ref.close()}
  }
  clicked(event:any){
    console.log(event)
  }
  emp(data){
    this.empp=data
  }
  
}

