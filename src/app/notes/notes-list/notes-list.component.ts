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
  private clickedControl: boolean = false;
  public viewControls: number = -1;
  public editMode: number = -1;

  constructor( private notesService: NotesService, private noteStorageService: NoteStorageService ){
    this.notesSubscription = this.notesService.notesChanged.subscribe((notes: Note[]) => {
      this.notes = notes;
    });
    this.notes = this.notesService.getNotes();
    this.noteStorageSubscription = this.noteStorageService.fetchNotes().subscribe();
  }

  ngOnInit(): void {
    // this.noteStorageSubscription = this.noteStorageService.fetchNotes().subscribe();
  }

  onClickNoteListItem(index: number){
    if( !this.clickedControl ){
      // console.log('clicked ROW');
      // console.log(index);

      if( this.viewControls != index ){
        this.viewControls = index;
      } else {
        this.viewControls = -1;
      }

    }

    // console.log('view controls for');
    // console.log(this.viewControls);
    this.clickedControl = false;
  }

  onClickEditNoteListItem(index: number){
    // console.log('clicked EDIT');
    this.clickedControl = true;
    this.editMode = index;
  }

  onClickDeleteNoteListItem(index: number) {
    // console.log('clicked DELETE');
    this.clickedControl = true;

    const confirmDelete = confirm( 'This will delete this note from the list.' );
    if( confirmDelete ){
      console.log('YES delete it');
      this.notesService.deleteNote(index);
      this.noteStorageService.storeNotes();
    } else {
      console.log('NO do not delete it.');
    }
  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
    this.noteStorageSubscription.unsubscribe();
  }

}
