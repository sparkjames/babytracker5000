import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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
  // isFetchingSubscription: Subscription = new Subscription;
  errorMessage = '';
  private errorSubscription: Subscription = new Subscription;

  private notesSubscription: Subscription = new Subscription;
  private noteStorageSubscription: Subscription = new Subscription;

  constructor(
    private notesService: NotesService,
    private noteStorageService: NoteStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // console.log('INIT notes-listing-component');
    this.isFetching = true;

    // Subscribe to the notes and initialize the array of notes so that the HTML list populates.
    this.notesSubscription = this.notesService.notesChanged.subscribe((notes: Note[]) => {
      // console.log('notes subscription triggered, updating notes...');
      this.notes = notes;
      this.isFetching = false;
    });

    // Subscribe to the auth service to check if user logged in, then fetch notes from the server.
    this.authService.user.subscribe(user => {
      // console.log('user subscription triggered...');
      if (user && this.notes.length === 0){
        // console.log('user found, about to fetch notes...');

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // this.noteStorageSubscription = this.noteStorageService.fetchNotes().subscribe(notes => {
        //   console.log(notes);
        // },
        // error => {
        //   this.errorMessage = error.message;
        //   this.isFetching = false;
        // });
        this.noteStorageService.fetchNotes();

      }
    });

    // Subscribe to possible error messages from storing posts.
    this.errorSubscription = this.noteStorageService.storeErrorMessage.subscribe( newErrorMessage => {
      this.errorMessage = newErrorMessage;
    });

  }

  onAcknowledgeError(): void {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
    this.noteStorageSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

}
