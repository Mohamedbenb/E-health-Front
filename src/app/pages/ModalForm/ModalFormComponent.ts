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

  submitted : boolean;
  modalForm: FormGroup;
  @Input() dialogTitle: string;
  @Input() action: string;
  @Input() dialogData: any;
  isDeleting = false;
  
  formData = {id: '', firstname: '',username: '',lastname: '', email: '',age: '',};
  
  deleteMode = false;
  protected cd: ChangeDetectorRef;
  
  constructor(cd: ChangeDetectorRef,protected ref: NbDialogRef<ModalFormComponent>,
    private customTableService: CustomTableService,
    @Inject(NB_DIALOG_CONFIG) public data: any
    ) {
      this.dialogTitle = data.dialogTitle;
      this.action = data.action;
      this.dialogData = data.dialogData;
      
      
      
    }
    
  ngOnInit(): void {
    if (this.action === 'edit') {
      this.formData = this.dialogData;
      console.log('Form values:',this.dialogData)
      this.submitted =false;
      
    }
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
    
    console.log('Form value:', this.formData);

    if (this.action === 'add') {
      this.customTableService.addTableData(this.formData).subscribe(() => {
        this.ref.close();
      }, (error) => {
        console.error('Error adding table data:', error);
      });
    } else if (this.action === 'edit') {
      
      console.log('checkpoint',this.dialogData.id)
      this.formData.id = this.dialogData.id;
      this.formData.firstname = this.dialogData.firstname;
      this.formData.lastname = this.dialogData.lastname;
      this.formData.username = this.dialogData.username;
      this.formData.email = this.dialogData.email;
      this.formData.age = this.dialogData.age;
      this.customTableService.updateTableData(this.dialogData).subscribe(() => {
        console.log('Data sent to updateTableData:', this.formData);
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
      
      this.deleteMode = true;
    } 
  }
  
}
  

