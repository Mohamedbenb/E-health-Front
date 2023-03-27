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
        this.http.delete(`http://localhost:3000/events/${event.id}`).subscribe(response => {
          console.log('Event deleted:', response);
        });
        
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] =[]


  dateStruct: NgbDateStruct;

  timeStruct: NgbTimeStruct;
  public breadcrumb: any;

  datePicker: any;
  

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
        color: event.color && event.color.primary ? { primary: event.color.primary, secondary: event.color.secondary } : colors.red, // check if primary exists and assign default value
        actions:this.actions
        
      }));
    });
    this.refresh.next();
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
    console.log('Handle action',action)
    if(action==="Edited"||action==="Clicked"||action==="Add")
    console.log('data:',this.modalContent)
    {this.modal.open(this.modalContent, { size: 'lg' });}
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

    this.handleEvent('Add new event', this.newEvent);
    this.refresh.next();
    this.ngOnInit()
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
  UpdateEv(mod: any):void{
    
    console.log('Data received:', mod.event);
    this.http.put<any>(`http://localhost:3000/events/${mod.event.id}`, mod.event).subscribe(response => {
      console.log('Event updated:', response);
    });
    this.modal.dismissAll('Dismissed after saving data');

  }
  onSubmit(mod:any):void{
    console.log('action', mod.action)
    if(mod.action === "Edited"||mod.action ==="Clicked"){
      console.log('action2',mod.action)
      this.UpdateEv(mod)
    }
    else {
      this.events.push(this.newEvent);
      this.http.post<any>('http://localhost:3000/events', mod.event).subscribe(response => {
        console.log('New event created:', response);
      });
      
    }
    this.modal.dismissAll('Dismissed after saving data');
    this.refresh.next();
  }

}

