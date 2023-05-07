import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { NbDialogRef, NB_DIALOG_CONFIG, NbDatepickerAdapter } from '@nebular/theme';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomTableService } from '../../custom-table.service';

@Component({
  selector: 'app-my-actions',
  templateUrl:"./TestForm-Template.html",
  styleUrls:['./Modal.component.scss'],
})
export class ModalFormComponent implements OnInit{
  fields = [];
  submitted : boolean;
  dialogForm: any;
  @Input() dialogTitle: string;
  @Input() action: string;
  @Input() dialogData: any;

  @Input() extra;
  @Input() customTableService:any;
 
  
  modalForm: FormGroup;
  
  //formData = {id: '', firstname: '',username: '',lastname: '', email: '',age: '',};
  
  deleteMode = false;
  protected cd: ChangeDetectorRef;
  
  constructor(private formBuilder: FormBuilder, cd: ChangeDetectorRef,protected ref: NbDialogRef<ModalFormComponent>,
    //private readonly datepickeradapter: NbDatepickerAdapter<Date>,
    //private customTableService: CustomTableService,
    ) {}
    

    
  ngOnInit(): void {
    
    const formGroupConfig = {};
    this.fields.forEach((field) => {
      formGroupConfig[field.name] = ['', field.validators];
      console.log('field name ',field.name)
    });
    this.modalForm = this.formBuilder.group(formGroupConfig);
    console.log('form',this.modalForm.getRawValue())
    if (this.action === 'edit') {
      //this.populate(this.formData,this.dialogData);
      this.modalForm.patchValue(this.dialogData)

      //console.log('Form valuess:',this.dialogForm)
      this.submitted =false;
      
      console.log('form',this.modalForm)
      console.log('edit',this.dialogData)
      
    }
   //this.modalForm = this.formBuilder.group({});
   //Object.keys(this.formData).forEach(key => {
   //  this.modalForm.addControl(key, this.formBuilder.control(''));
   //});
   //
   //console.log('Form valuess:',Object.keys(this.formData))
   if (this.action === 'add') {
   // this.buildForm(this.formData);
    console.log('extraaa',this.extra)
  }
  }
  getFormControlsFields(model:any) {   
    const formGroupFields = {};
    for (const field in Object(model)) {
      formGroupFields[field] = new FormControl("");
      this.fields.push(field);
  } return formGroupFields;
  
}
buildForm(model:any) {
  const formGroupFields = this.getFormControlsFields(model);
  this.modalForm = new FormGroup(formGroupFields,Validators.required);
}
populate(model:any, data:any) {
  const formGroupFields = this.getFormControlsFields(model);
  this.modalForm = new FormGroup(formGroupFields,Validators.required);
  this.modalForm.patchValue(data)
}

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  
  getConfigValue(key: string): any{};
  

  onCancel() {
    this.ref.close();
  }
  
  onSubmit(): void {
    const data = this.modalForm.getRawValue()
    console.log('Form value:', data);

    if (this.action === 'add') {

      console.log('Form values:',data)
      this.customTableService.addData(data,this.extra).subscribe(() => {
        this.ref.close();
      }, (error) => {
        console.error('Error adding table data:', error);
      });
    } else if (this.action === 'edit') {
      
      //console.log('checkpointy',this.modalForm.value.firstname)
     
      console.log('Data sent to this.extra:', this.extra);
      
      this.modalForm.value.id=this.dialogData.id
      console.log('Data sent to updateTableData:', this.modalForm.value.id);
      this.customTableService.updateData(this.modalForm.value,this.extra).subscribe(() => {
        this.ref.close();
      }, (error) => {
        console.error('Error updating table data:', error);
      });
    }
  }

  onClose(): void {
    
    this.ref.close();
  }

  onDelete() {
    if (this.action === 'delete') {
      console.log('del',this.dialogData.id)
      console.log('extra',this.extra)
      this.customTableService.deleteData(this.dialogData.id,this.extra).subscribe(() => {
        this.ref.close();
      }, (error) => {
        console.error('Error deleting table data:', error);
      });
    } else {
      this.action = 'delete';
      
      this.deleteMode = true;
    } 
  }
  
}
  

