import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { NbDialogRef, NB_DIALOG_CONFIG } from '@nebular/theme';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomTableService } from '../../custom-table.service';

@Component({
  selector: 'app-my-actions',
  templateUrl:"./Modal-template.html",
  styleUrls:['./Modal.component.scss'],
})
export class ModalFormComponent implements OnInit{
  fields = [];
  submitted : boolean;
  dialogForm: any;
  @Input() dialogTitle: string;
  @Input() action: string;
  @Input() dialogData: any;
  @Input() formData:any;
  @Input() extra;
  @Input() customTableService:any;
  isDeleting = false;
  modalForm: FormGroup;
  
  //formData = {id: '', firstname: '',username: '',lastname: '', email: '',age: '',};
  
  deleteMode = false;
  protected cd: ChangeDetectorRef;
  
  constructor(private formBuilder: FormBuilder, cd: ChangeDetectorRef,protected ref: NbDialogRef<ModalFormComponent>,
    //private customTableService: CustomTableService,
    @Inject(NB_DIALOG_CONFIG) public data: any
    ) {
      this.dialogTitle = data.dialogTitle;
      this.action = data.action;
      
      

      
      
    }
    

    
  ngOnInit(): void {
    if (this.action === 'edit') {
      this.populate(this.formData,this.dialogData);
      
      //console.log('Form valuess:',this.dialogForm)
      this.submitted =false;
      console.log('model',this.formData)
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
    this.buildForm(this.formData);
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
    
    console.log('Form value:', this.modalForm.value);

    if (this.action === 'add') {
      console.log('Form values:',this.modalForm.value)
      this.customTableService.addTableData(this.modalForm.value,this.extra).subscribe(() => {
        this.ref.close();
      }, (error) => {
        console.error('Error adding table data:', error);
      });
    } else if (this.action === 'edit') {
      
      console.log('checkpointy',this.modalForm.value.firstname)
      
      
      this.modalForm.value.id=this.dialogData.id
      this.customTableService.updateTableData(this.modalForm.value,this.extra).subscribe(() => {
        console.log('Data sent to updateTableData:', this.modalForm.value);
        console.log('id', this.modalForm.value.id);
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
      console.log('del',this.dialogData)
      this.customTableService.deleteTableData(this.dialogData.id,this.extra).subscribe(() => {
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
  

