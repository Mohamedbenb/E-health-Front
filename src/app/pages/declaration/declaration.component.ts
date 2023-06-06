import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocieteService } from '../../services/societe.service';
import { Societe } from '../../models/Societe';
import { UniOp } from '../../models/UniOp';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { LocalDataSource } from 'ng2-smart-table';
import { map, startWith } from 'rxjs/operators';
import { MalProfService } from '../../services/mal-prof.service';
import { MalProf } from '../../models/MalProf';
import { DeclarationService } from '../../services/declaration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-declaration',
  templateUrl: 'declaration.component.html',
  styleUrls: ['declaration.component.scss'],
})
export class DeclarationComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  societes: Societe []=[];
  uniOp: UniOp;
  employees: Employee[];
  filteredOptions$:any
  employee:Employee;
  employeeFormControl: FormControl;
  constatFormControl: FormControl;
  malProf:MalProf;
  request:any
  constructor(private fb: FormBuilder,
              private societeService: SocieteService,
              private employeeService: EmployeeService,
              private malProfService: MalProfService,
              private declarationService: DeclarationService,
              private router: Router,
      ) {
  }

  ngOnInit() {
    
    
    this.employeeFormControl=new FormControl;
    this.constatFormControl=new FormControl;
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
    this.societeService.getData().subscribe((response)=>{
      this.societes=response;
    })
    this.malProfService.getData().subscribe((data)=>{
      this.malProf=data;
    })
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
  selectUniOp(option){
    this.uniOp=option;
    console.log('uniOp',this.uniOp)
    this.getEmployees(this.uniOp.id)
  }
  malprofid:any
  selectmalProf(option){
    this.malprofid=option.id;
    console.log('mal',this.malprofid)
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
  selectedEmployee=false;
  getSelectedEmployee(data){
    this.selectedEmployee=true
    this.employee=data
    console.log('selected employee',this.employee)

    
  }
  
  trackByFn(item) {
    return item.id;
  }
  datas:any
  onSubmit(){
    this.request = {
      empid: this.employee.id,
      malid: this.malprofid,
      constat: this.constatFormControl.value,
      dateDec: new Date()
    };
    console.log(this.request)
    this.declarationService.addData(this.request).subscribe((data)=>{
      const index=2;
      this.datas=data;
      this.datas.index=index
      this.datas.employee=data.emp
      console.log('response',data)
      this.router.navigate(['pages/historique'], { state: data });
    })
  }

}
