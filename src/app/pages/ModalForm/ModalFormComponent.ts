import { Component, Inject, Input, OnInit } from '@angular/core';
import { NbDialogRef, NB_DIALOG_CONFIG } from '@nebular/theme';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomTableService } from '../../custom-table.service';

@Component({
  selector: 'app-my-actions',
  templateUrl:"Modal-template.html"
})
export class ModalFormComponent implements OnInit{
  modalForm: FormGroup;
  dialogTitle: string;
  action: string;
  dialogData: any;
  deleteMode = false;

  constructor(private fb: FormBuilder,protected ref: NbDialogRef<ModalFormComponent>,
    private customTableService: CustomTableService,
    @Inject(NB_DIALOG_CONFIG) public data: any
    ) {
      this.dialogTitle = data.dialogTitle;
      this.action = data.action;
      this.dialogData = data.dialogData;
      
      
    }
  ngOnInit(): void {
    console.log('Dialog data:', this.dialogData);

    this.modalForm = this.fb.group({
      id: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      
      

    });
        if (this.action === 'edit') {
      this.modalForm.patchValue(this.dialogData);
      console.log('Form values:',this.modalForm)
      
    }
    if (this.action === 'delete') {
      this.modalForm.disable();
      this.deleteMode = true;
    }
  }
  
  
  

  onCancel() {
    this.ref.close();
  }

  onSubmit(): void {
    console.log('Form value:', this.modalForm.value);

    if (this.action === 'add') {
      this.customTableService.addTableData(this.modalForm.value).subscribe(() => {
        this.ref.close();
      }, (error) => {
        console.error('Error adding table data:', error);
      });
    } else if (this.action === 'edit') {
      this.customTableService.updateTableData(this.modalForm.value).subscribe(() => {
        console.log('Data sent to updateTableData:', this.modalForm.value);
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
      this.customTableService.deleteTableData(this.dialogData.id).subscribe(() => {
        this.ref.close();
      }, (error) => {
        console.error('Error deleting table data:', error);
      });
    } else {
      this.action = 'delete';
      this.modalForm.disable();
      this.deleteMode = true;
    }
  }
}
  

