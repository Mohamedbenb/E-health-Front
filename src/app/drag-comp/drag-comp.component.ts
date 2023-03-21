import { ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NgbDateStruct, NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { DayViewHourSegment } from 'calendar-utils';
import { addDays, addMinutes, endOfDay, endOfMonth, endOfWeek, isSameDay, isSameMonth, startOfDay, startOfMonth, subDays } from 'date-fns';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { fromEvent, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

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

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}


function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

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

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 0),
      end: addDays(new Date(), 1),
      title: 'Business Lunch',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },

    {
      start: subDays(endOfMonth(new Date()), 2),
      end: addDays(endOfMonth(new Date()), 1),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },

    {
      start: subDays(startOfMonth(new Date()), 1),
      end: addDays(startOfMonth(new Date()), 0),
      title: 'Meeting',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];


  dateStruct: NgbDateStruct;

  timeStruct: NgbTimeStruct;
  public breadcrumb: any;

  datePicker: any;
  private onChangeCallback: (date: Date) => void = () => { };

  /**
   *
   * @param NgbModal      modal
   */
  constructor(private modal: NgbModal) { }

  /**
   * onInit
   */
  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Calendar AddEvent',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Apps',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Calendars',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'AddEvent',
          'isLink': false,
          'link': '#'
        }
      ]
    };
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
    this.handleEvent('Dropped or resized', event);
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

    // this.refresh.next();
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

}

