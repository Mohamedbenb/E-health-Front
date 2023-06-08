import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { ModalFormComponent } from "../ModalForm/ModalFormComponent";
import { NbDialogService } from "@nebular/theme";

import { FormGroup, Validators } from "@angular/forms";
import { UniopService } from "../../services/uniop.service";

@Component({
    selector: 'ngx-Uniops',
    styleUrls: ['./uniops.component.scss'],
    template: `
<div class="uniops-container">
  <nb-select placeholder="Unités opérationelles" [(ngModel)]="selectedUniopIndex" >
    <nb-option *ngFor="let item of uniops" [value]="uniops.indexOf(item)">{{item.title}}</nb-option>
  </nb-select>

  <button type="button" (click)="openAddDialog()" class="btn btn-primary">
    <i class="fa fa-plus"></i> 
  </button>

  <button type="button" (click)="onEditClick()" class="btn btn-primary" [disabled]="selectedUniopIndex === undefined">
    <i class="fa fa-edit"></i> 
  </button>

  <button type="button" (click)="openDeleteDialog()" class="btn btn-primary" [disabled]="selectedUniopIndex === undefined">
    <i class="fa fa-trash"></i> 
  </button>
</div>

  `,
  
  })
  
 
  export class UniopsComponent implements ViewCell{

    fields = [
      { name: 'title', type: 'text', title:'Nom', validators: [Validators.required, Validators.minLength(2)] },
      { name: 'reshum', type: 'email', title:'Email', validators: [Validators.required, Validators.email] },

    ];
    modalForm: FormGroup;

    @Input() rowData: any;
    @Input() value: any
    @Input() loadTableData
    @Output() customEvent = new EventEmitter();
    emitEvent(){
      this.customEvent.emit()
    }
    uniops
    selectedUniopIndex=0;
    constructor(private Service: UniopService,
      private dialogService: NbDialogService,) {}
      
    ngOnInit() {
        
        this.uniops=this.rowData.uniops
        
        //this.emitEvent()
    }
    openAddDialog() {
      
      console.log('checkpoint',this.rowData)
      this.dialogService.open(ModalFormComponent, {
        context: {
          dialogTitle: 'Add Item',
          action: 'add',
          dialogData:this.rowData,
          customTableService: this.Service,
          fields:this.fields,
          extra: this.rowData.id,
          modalForm:this.modalForm
        },}).onClose.subscribe(() => {
          console.log('updating')
          //this.onActionCompleted.emit();
          this.emitEvent()
        })
    }
    openDeleteDialog(){
      const tableData = this.uniops[this.selectedUniopIndex];
      this.dialogService.open(ModalFormComponent, {
        context: {
          dialogTitle: 'delete Item',
          action: 'delete',
          dialogData:tableData,
          extra: this.rowData.id,
          customTableService: this.Service
        },}).onClose.subscribe(() => {
          console.log('updating')
          //this.onActionCompleted.emit();
          this.emitEvent()
        })
    }
    onEditClick() { 
      console.log('checkpoint',this.rowData)
      console.log('this.rowData.id',this.rowData.id)
      //console.log("ev",event.data)
      // get the data of the selected row
      const tableData = this.uniops[this.selectedUniopIndex];
      console.log("tableData",tableData)
      
      // open the dialog with pre-filled fields
      this.dialogService.open(ModalFormComponent, {
        context: {
          dialogTitle: 'Edit Item',
          action: 'edit',
          dialogData: tableData,
          
          customTableService: this.Service,
          fields:this.fields,
          extra:this.rowData.id,
          modalForm:this.modalForm
        },
      },).onClose.subscribe(() => {
        console.log('updating',tableData)
        //this.onActionCompleted.emit();
        this.emitEvent()
      })
  }
  }