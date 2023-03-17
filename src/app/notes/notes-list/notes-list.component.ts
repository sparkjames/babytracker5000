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

  notes: Note[] = [];
  isFetching = false;
  isFetchingSubscription: Subscription = new Subscription;

  private notesSubscription: Subscription = new Subscription;

  constructor(
    private notesService: NotesService,
    private noteStorageService: NoteStorageService
  ) {}

  ngOnInit(): void {
    // Subscribe to isFetching from the storage service.
    this.isFetchingSubscription = this.noteStorageService.isFetching.subscribe(status => this.isFetching = status);

    // Subscribe to the notes and initialize the array of notes so that the HTML list populates.
    this.notesSubscription = this.notesService.notesChanged.subscribe((notes: Note[]) => {
      this.notes = notes;
    });
    this.notes = this.notesService.getNotes();
    console.log(this.notes);
  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
  }

}
