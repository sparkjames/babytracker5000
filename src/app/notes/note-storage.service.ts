import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Note } from './note.model';
import { BehaviorSubject, map, tap, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class NoteStorageService {

  isFetching = new BehaviorSubject<boolean>(false);
  isStoring = new BehaviorSubject<boolean>(false);
  private APIEndpoint = 'https://babytracker5000-default-rtdb.firebaseio.com/notes.json';

  constructor(
    private http: HttpClient,
    private notesService: NotesService
  ) {}

  storeNotes(){
    // console.log('About to store notes...');
    const notes = this.notesService.getNotes();
    // console.log(notes);

    this.isStoring.next(true);

    try {
      // LocalStorage method
      // localStorage.setItem('notes', JSON.stringify(notes));

      // Remote method
      this.http
        .put(
          this.APIEndpoint,
          notes
        )
        .subscribe(response => {
          console.log('Notes stored.');
          console.log(response);
          this.isStoring.next(false);
        });

    } catch (error) {
      console.error('Error fetching notes: ', error);
      this.isStoring.next(false);
    }


  }

  fetchNotes() {
    console.log('start fetch');
    this.isFetching.next(true);

    // LocalStorage method
    // const notes:Note[] = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes') || '{}') : [];
    // if (notes) {
    //   this.notesService.setNotes(notes);
    // }
    // this.isFetching.next(false);

    // return notes;

    // Remote method
    return this.http.get(this.APIEndpoint).subscribe( notes => {
      // console.log('fetched notes: ');
      // console.log(typeof notes);
      // console.log(notes);

      // const newNotes = Object.values(notes);
      const newNotes: Note[] = [];
      Object.values(notes).forEach( note => newNotes.push(note) );
      // console.log('newNotes = ', newNotes);

      if( newNotes ){
        this.notesService.setNotes(newNotes);
      }
      this.isFetching.next(false);
      // console.log('finished fetch');
      // console.log(notes);
    }, this.handleError)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
