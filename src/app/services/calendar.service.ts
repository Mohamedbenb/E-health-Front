import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }
  newItemAdded: EventEmitter<void> = new EventEmitter<void>();

  triggerNewItemAdded() {
    this.newItemAdded.emit();
  }
}
