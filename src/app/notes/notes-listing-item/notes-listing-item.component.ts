import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';
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
  editMode = false;

  note: Note = {
    createdDateTime: new Date(),
    startTime: '',
    description: '',
    durationLeft: '',
    durationRight: '',
    formulaAmount: '',
    wet: false,
    poo: false
  };

  private userLocale: string = navigator.languages != undefined ? navigator.languages[0] : navigator.language;
  noteCreatedDateTime: string | undefined;
  noteStartTime: string | undefined;

  constructor( private notesService: NotesService ){}

  ngOnInit(): void {
    if( !this.userLocale ){
      this.userLocale = 'en-US';
    }

    this.note = this.notesService.getNote(this.noteId);

    this.noteCreatedDateTime = formatDate(this.note.createdDateTime, 'MMMM dd, hh:mm a', this.userLocale);

    const dateStringBuilder = formatDate(this.note.createdDateTime, 'MMMM dd YYYY', this.userLocale);
    // console.log(dateStringBuilder);
    this.noteStartTime = formatDate(new Date(dateStringBuilder + ', ' + this.note.startTime), 'MMMM dd, h:mm a', this.userLocale);
    // console.log(this.noteStartTime);

  }

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
