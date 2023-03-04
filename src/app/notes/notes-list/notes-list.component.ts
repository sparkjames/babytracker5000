import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditNoteService } from '../edit-note.service';
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
  private editNoteSubscription: Subscription;
  // private clickedControl = false;
  public viewControls = -1;
  public editMode = -1;

  constructor(
    private notesService: NotesService,
    private noteStorageService: NoteStorageService,
    private editNoteService: EditNoteService
    ){
    this.notesSubscription = this.notesService.notesChanged.subscribe((notes: Note[]) => {
      this.notes = notes;
    });
    this.notes = this.notesService.getNotes();
    this.noteStorageSubscription = this.noteStorageService.fetchNotes().subscribe();
    this.editNoteSubscription = this.editNoteService.editNote.subscribe( (index:number) => {
      this.editMode = index;
    });
  }

  ngOnInit(): void {
    // this.noteStorageSubscription = this.noteStorageService.fetchNotes().subscribe();
  }

  onClickNoteListItem(event:any, index: number){
    console.log('%%% CLICK %%% onClickNoteListItem()', event);

    let parent_container = event.target;
    do {
      parent_container = parent_container ? parent_container.parentNode : document.body;
    }
    while (!parent_container.matches('form,button') && parent_container !== document.body);
    // console.log('parent container = ', parent_container);

    if (parent_container.matches('form,button')){
      return;
    }

    if( this.viewControls !== index ){
      this.viewControls = index;
    } else {
      this.viewControls = -1;
    }

  }

  onClickEditNoteListItem(index: number){
    // console.log('clicked EDIT', index);
    if( this.editMode === index ){
      // this.editNoteService.setEditNote(-1);
      this.clearState();

    } else {
      // this.clickedControl = true;
      this.editNoteService.setEditNote(index);
    }

  }

  onClickDeleteNoteListItem(index: number) {
    // console.log('clicked DELETE');
    // this.clickedControl = true;

    const confirmDelete = confirm( 'This will delete this note from the list.' );
    if( confirmDelete ){
      // console.log('YES delete it');
      this.notesService.deleteNote(index);
      this.noteStorageService.storeNotes();
      this.clearState();

    } else {
      // console.log('NO do not delete it.');
    }
  }

  clearState(){
    this.viewControls = -1;
    this.editNoteService.setEditNote(-1);
    // this.clickedControl = false;
  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
    this.noteStorageSubscription.unsubscribe();
    this.editNoteSubscription.unsubscribe();
  }

}
