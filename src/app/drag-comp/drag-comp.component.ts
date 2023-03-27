import { HttpClient } from '@angular/common/http';
import { TemplateRef, ViewChild } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NgbDateStruct, NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import {  endOfDay,isSameDay, isSameMonth, startOfDay} from 'date-fns';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-drag-comp',
  templateUrl: './drag-comp.component.html',
  styleUrls: ['./drag-comp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DragCompComponent implements OnInit {

  @BlockUI('default') blockUIDefault: NgBlockUI;
  date: Date;
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  jsonevent: any[];
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  newEvent: CalendarEvent;
  viewDate: Date = new Date();
  activeDayIsOpen = true;
  modalData: {action: string;
          event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] =[]


  dateStruct: NgbDateStruct;

  timeStruct: NgbTimeStruct;
  public breadcrumb: any;

  datePicker: any;
  private onChangeCallback: (date: Date) => void = () => { };

  /**
   *
   * @param NgbModal      modal
   */
  constructor(private modal: NgbModal, private http: HttpClient ) { }

  /**
   * onInit
   */
  ngOnInit() {
    
    this.http.get<any[]>('http://localhost:3000/events').subscribe(data => {
      this.events = data.map(event => ({
        ...event,
        start: new Date(event.start), // convert start to Date object
        end: new Date(event.end), // convert end to Date object
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true,
        color: event.color && event.color.primary ? { primary: event.color.primary, secondary: event.color.secondary } : colors.red // check if primary exists and assign default value
        
      }));
    });
  }

  /**
   * selacted date
   *
   * @param date      Clicked date in datepicker
   * @param events      Events of selected date
   */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
    console.log('clicked')
  }

  /**
   *
   * @param event     Event of the time change
   * @param newStart      Event start date
   * @param newEnd        Event end date
   */
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
  
    this.http.put<any>(`http://localhost:3000/events/${event.id}`, event).subscribe(response => {
      console.log('Event updated:', response);
    });
  
    this.refresh.next();
  }


  /**
   *
   * @param action      Event action
   * @param event     calendar event
   */
  handleEvent(action: string, event: CalendarEvent): void {
    
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  /**
   * Add new event in modal
   */
  addEvent(): void {
    this.newEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      actions: this.actions,
    };
    this.events.push(this.newEvent);
  
    this.http.post<any>('http://localhost:3000/events', this.newEvent).subscribe(response => {
      console.log('New event created:', response);
    });
  
    this.handleEvent('Add new event', this.newEvent);
    this.refresh.next();
  }

  /**
   * Reload card
   */
  reloadDefault () {
    this.blockUIDefault.start('Loading..');

    setTimeout(() => {
       this.blockUIDefault.stop();
    }, 2500);
  }
  UpdateEv(event: CalendarEvent):void{
    console.log('Data received in updateTableData:', event);
    this.http.put<any>(`http://localhost:3000/events/${event.id}`, event).subscribe(response => {
      console.log('Event updated:', response);
    });
    this.modal.dismissAll('Dismissed after saving data');

  }

}

