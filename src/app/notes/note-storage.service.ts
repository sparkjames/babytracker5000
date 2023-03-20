import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Note } from './note.model';
import { catchError, exhaustMap, map, Subject, take, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class NoteStorageService {

  storeErrorMessage = new Subject<string>();

  private APIEndpoint = 'https://babytracker5000-default-rtdb.firebaseio.com/notes.json';

  constructor(
    private http: HttpClient,
    private notesService: NotesService,
    private authService: AuthService
  ) {}

  storeNotes(){
    // console.log('About to store notes...');
    const notes = this.notesService.getNotes();
    // console.log(notes);

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
        }, error => {
          let errorMessage = error.message;
          if( error.status == 401 ){
            errorMessage = 'You must login to store notes.';
          }
          this.storeErrorMessage.next(errorMessage);
        });

    } catch (error) {
      console.error('Error fetching notes: ', error);
    }


  }

  fetchNotes() {
    console.log('start fetch');

    // LocalStorage method
    // const notes:Note[] = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes') || '{}') : [];
    // if (notes) {
    //   this.notesService.setNotes(notes);
    // }

    // return notes;

    // Remote method
    return this.http.get<object>(this.APIEndpoint)
      .pipe(
        map((responseData) => {
          console.log('responseData = ', typeof responseData);
          console.log(responseData);
          const newNotes: Note[] = [];
          Object.values(responseData).forEach(note => newNotes.push(note));
          return newNotes;
        }),
        tap((notes: Note[]) => {
          console.log('tap notes = ', typeof notes);
          console.log(notes);
          this.notesService.setNotes(notes);
        }),
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse) {
    // console.log('handleError');
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    let errorMessage = 'Something bad happened; please try again later.';
    if( error.status == 401 ){
      errorMessage = 'You must log in to access your notes.';
    }

    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorMessage));
  }

  // private handleComplete() {
  //   console.log('handleComplete');
  // }

}
