import { Component, Injectable, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbDialogService } from '@nebular/theme';
import { ModalFormComponent } from '../pages/ModalForm/ModalFormComponent';
import { actionSettings } from '../constants';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  @Input() Service:any
  @Input() tableData:any
  @Input() extra
  @Input() formData
  @Input() modalForm
  @Input() fields
  @Input() col= []
  private tableData$: Subject<LocalDataSource> = new Subject<LocalDataSource>();
  constructor(private dialogService: NbDialogService,) { }
  settings: any

  ngOnInit(): void {
  }
  getSettings(col){
    console.log(col)
    return this.settings={
      columns: col,
        
      ...actionSettings
    }
  }
  loadTableData(service: any,ex): Observable<LocalDataSource> {
    return service.getData(ex).pipe(
      map((data: any) => new LocalDataSource(data)),
      catchError((error: any) => {
        console.error('Error loading table data:', error);
        return of(error);
      })
    );
  }
  

  getTableData(): Observable<LocalDataSource> {
    return this.tableData$.asObservable();
  }

  
  

  

  onCustomEvent(event: any) {
    //this.loadTableData();
    console.log('Custom event received in ParentComponent:', event);
    console.log("event emitted")
  }

  onDeleteConfirm(event: any,Service: any,extra: any): Observable<any> {
    const tableData = event.data;
    return this.dialogService.open(ModalFormComponent, {
      context: {
        dialogTitle: 'delete Item',
        action: 'delete',
        dialogData:tableData,
        extra:extra,
        customTableService: Service
      },}).onClose.pipe(
        tap(() => {
          console.log('updating');
    
        }),
        catchError((error: any) => {
          console.error('Error opening add dialog:', error);
          return of(error);
        })
      );
  }

  openAddDialog(Service: any, fields: any, extra: any, modalForm: any): Observable<any> {
    console.log('checkpoint', this.formData);
    return this.dialogService.open(ModalFormComponent, {
      context: {
        dialogTitle: 'Add Item',
        action: 'add',
        customTableService: Service,
        fields: fields,
        extra: extra,
        modalForm: modalForm
      }
    }).onClose.pipe(
      tap(() => {
        console.log('updating');
  
      }),
      catchError((error: any) => {
        console.error('Error opening add dialog:', error);
        return of(error);
      })
    );
  }

  onEditClick(event: any,Service:any ,fields,extra,modalForm) : Observable<any>{
    //console.log("ev",event.data)
    // get the data of the selected row
    const tableData = event.data;
    console.log("tableData",tableData)
  
    // open the dialog with pre-filled fields
    return this.dialogService.open(ModalFormComponent, {
      context: {
        dialogTitle: 'Edit Item',
        action: 'edit',
        dialogData: tableData,
        customTableService: Service,
        fields:fields,
        extra:extra,
        modalForm:modalForm
      },
    },).onClose.pipe(
      tap(() => {
        console.log('updating');
  
      }),
      catchError((error: any) => {
        console.error('Error opening add dialog:', error);
        return of(error);
      })
    );
}


}
