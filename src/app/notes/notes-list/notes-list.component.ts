import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NoteStorageService } from '../note-storage.service';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnDestroy {

  notes: Note[];
  editMode = false;
  isFetching = false;
  isFetchingSubscription: Subscription;

  private notesSubscription: Subscription;

  constructor(
    private notesService: NotesService,
    private noteStorageService: NoteStorageService
  ) {
    // Subscribe to isFetching from the storage service.
    this.isFetchingSubscription = this.noteStorageService.isFetching.subscribe( status => this.isFetching = status );

    // Subscribe to the notes and initialize the array of notes so that the HTML list populates.
    this.notesSubscription = this.notesService.notesChanged.subscribe((notes: Note[]) => {
      this.notes = notes;
    });
    this.notes = this.notesService.getNotes();
  }

  ngOnInit(): void {
    // this.notesSubscription = this.notesService.notesChanged.subscribe((notes: Note[]) => {
    //   this.notes = notes;
    // });
    // this.notes = this.notesService.getNotes();
    // this.noteStorageSubscription = this.noteStorageService.fetchNotes().subscribe();
  }

  onClickNoteListItem(event:any, index: number){

    let parent_container = event.target;
    do {
      parent_container = parent_container ? parent_container.parentNode : document.body;
    }
    while (parent_container && !parent_container.matches('form,button') && parent_container !== document.body);
    // console.log('parent container = ', parent_container);

    if (!parent_container || parent_container.matches('form,button')){
      return;
    }
    console.log('%%% CLICK %%% onClickNoteListItem()', event);
    console.log('note index = ', index);

    if (this.editMode === false) {
      this.editMode = true;

    } else {
      this.editMode = false;
    }

    console.log('final editMode index = ', this.editMode);

  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
  }

}
