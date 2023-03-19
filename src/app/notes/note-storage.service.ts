import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Note } from './note.model';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable()
export class NoteStorageService {

  // isFetching = new BehaviorSubject<boolean>(false);
  // isStoring = new BehaviorSubject<boolean>(false);
  private APIEndpoint = 'https://babytracker5000-default-rtdb.firebaseio.com/notes.json';

  constructor(
    private http: HttpClient,
    private notesService: NotesService
  ) {}

  storeNotes(){
    // console.log('About to store notes...');
    const notes = this.notesService.getNotes();
    // console.log(notes);

    // this.isStoring.next(true);

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
          // this.isStoring.next(false);
        });

    } catch (error) {
      console.error('Error fetching notes: ', error);
      // this.isStoring.next(false);
    }


  }

  fetchNotes() {
    console.log('start fetch');
    // this.isFetching.next(true);

    // LocalStorage method
    // const notes:Note[] = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes') || '{}') : [];
    // if (notes) {
    //   this.notesService.setNotes(notes);
    // }
    // this.isFetching.next(false);

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
          // this.isFetching.next(false);
        }),
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse) {
    console.log('handleError');
    // this.isFetching.next(false);
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

  private handleComplete() {
    console.log('handleComplete');
    // this.isFetching.next(false);
  }

}
