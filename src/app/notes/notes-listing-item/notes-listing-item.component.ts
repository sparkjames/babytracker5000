import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

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
    description: '',
    noteType: '',
  };

  constructor( private notesService: NotesService ){}

  ngOnInit(): void {
    // console.log('Using note for listing item: ', this.noteId);
    this.note = this.notesService.getNote(this.noteId);
  }

  onClickNoteListItem(event: any){
    if( !event.target ){
      return;
    }

    console.log('%%% CLICK %%% onClickNoteListItem()', event);
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
