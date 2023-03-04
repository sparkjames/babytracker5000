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
  notesSubscription: Subscription;
  private noteStorageSubscription: Subscription;
  public editMode = -1;

  constructor(
    private notesService: NotesService,
    private noteStorageService: NoteStorageService
    ){
    this.notesSubscription = this.notesService.notesChanged.subscribe((notes: Note[]) => {
      this.notes = notes;
    });
    this.notes = this.notesService.getNotes();
    this.noteStorageSubscription = this.noteStorageService.fetchNotes().subscribe();
  }

  ngOnInit(): void {
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

    if (this.editMode === index) {
      this.editMode = -1;

    } else {
      this.editMode = index;
    }

  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
    this.noteStorageSubscription.unsubscribe();
  }

}
