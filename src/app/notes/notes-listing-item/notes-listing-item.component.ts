import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../note.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-notes-listing-item',
  templateUrl: './notes-listing-item.component.html',
  styleUrls: ['./notes-listing-item.component.scss'],
  host: {
    class: 'notes-listing-item-container'
  }
})
export class NotesListingItemComponent implements OnInit {
  @Input() noteId = -1;

  @Input() note: Note = {
    createdDateTime: new Date(),
    startDateTime: '',
    description: '',
    durationLeft: '',
    durationRight: '',
    formulaAmount: '',
    wet: false,
    poo: false
  };

  editMode = false;

  private userLocale: string = navigator.languages != undefined ? navigator.languages[0] : navigator.language;
  displayCreatedDateTime: string | undefined;
  displayStartDateTime: string | undefined;
  // noteDay: string | undefined;

  ngOnInit(): void {
    if( !this.userLocale ){
      this.userLocale = 'en-US';
    }

    this.displayCreatedDateTime = formatDate(this.note.createdDateTime, 'MMMM dd, hh:mm a', this.userLocale);

    const dateStringBuilder = formatDate(this.note.createdDateTime, 'MMMM dd YYYY', this.userLocale);
    // console.log(dateStringBuilder);
    // this.displayStartDateTime = formatDate(new Date(dateStringBuilder + ', ' + this.note.startDateTime), 'h:mm a', this.userLocale);
    this.displayStartDateTime = formatDate(this.note.startDateTime, 'h:mm a', this.userLocale);
    // console.log(this.displayStartDateTime);

    // const prev_showDay = this.showDay;
    // this.showDay = formatDate(this.note.createdDateTime, 'EEE, MMMM dd', this.userLocale);

    // // TODO left off here, need a way to set display_showDay to true/false depending if prev_showDay == (the new value for this.showDay)

    // this.showDayChange.emit(this.showDay);

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickNoteListItem(event: any){
    if( !event.target ){
      return;
    }

    // console.log('%%% CLICK %%% onClickNoteListItem()', event);
    let parent_container = event.target;
    do {
      parent_container = parent_container ? parent_container.parentNode : document.body;
    }
    while (parent_container && !parent_container.matches('form,button') && parent_container !== document.body);

    if (!parent_container || parent_container.matches('form,button')) {
      return;
    }
    // console.log('note index = ', index);

    if (!this.editMode){
      this.editMode = !this.editMode;
    }

  }

}
