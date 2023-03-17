import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteDisplayDayService {
  private lastDisplay = '';
  displayChanged = new Subject<string>;

  // constructor() { }

  getLastDisplay(){
    return this.lastDisplay;
  }

  setLastDisplay( displayDay: string ){
    this.lastDisplay = displayDay;
    this.displayChanged.next(this.lastDisplay);
  }

}
