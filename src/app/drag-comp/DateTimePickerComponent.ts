import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import {
  getSeconds,
  getMinutes,
  getHours,
  getDate,
  getMonth,
  getYear,
  setSeconds,
  setMinutes,
  setHours,
  setDate,
  setMonth,
  setYear
} from 'date-fns';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimePickerComponent),
  multi: true
};

@Component({
  selector: 'app-mwl-demo-utils-date-time-picker',
  templateUrl: 'dateTimeComponent.component.html',
  styleUrls: ['dateTimePickerComponent.component.css'],
  providers: [DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class DateTimePickerComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() evid;
  date: Date;

  dateStruct: NgbDateStruct;

  timeStruct: NgbTimeStruct;

  datePicker: any;
  ev:Object;

  private onChangeCallback: (date: Date) => void = () => { console.log('ssdsd', this.date)};
  eve: any;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) { }
  
  

  writeValue(date: Date): void {
   
    this.date = date;
    this.dateStruct = {
      day: getDate(date),
      month: getMonth(date) + 1,
      year: getYear(date)
    };
    this.timeStruct = {
      second: getSeconds(date),
      minute: getMinutes(date),
      hour: getHours(date)
    };
    this.cdr.detectChanges();
    console.log('check point #1',this.evid) 
    
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
    console.log('check point #2',this.evid)
  }

  registerOnTouched(fn: any): void { }

  updateDate(): void {
    //this.updateEvent()
    const newDate: Date = setYear(
      setMonth(
        setDate(this.date, this.dateStruct.day),
        this.dateStruct.month - 1
      ),
      this.dateStruct.year
    );
    this.onChangeCallback(newDate);
    console.log('check point #4',this.evid)
  }

  updateTime(): void {

    console.log('check point #3',this.evid)
    const newDate: Date = setHours(
      setMinutes(
        setSeconds(this.date, this.timeStruct.second),
        this.timeStruct.minute
      ),
      this.timeStruct.hour
    );
    this.onChangeCallback(newDate);
    console.log("time updated",newDate)
    //this.updateEvent()
    
    
  }
  //updateTitle():{
    
 // }
  

  updateEvent(): void {
    
    const updatedEvent = {
      ...this.date,
      start: this.date.toISOString(), // Assuming start and end properties are ISO strings
      end: this.date.toISOString()
    };

    this.http.put(`http://localhost:3000/events/${this.evid.id}`, updatedEvent).subscribe(() => {
      console.log('Event updated successfully.');
    });
  }

  
}
