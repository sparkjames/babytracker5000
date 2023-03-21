import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Note } from './note.model';
import { catchError,  exhaustMap,  map, Subject,  Subscription,  take,  tap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable()
export class NoteStorageService implements OnInit, OnDestroy {

  storeErrorMessage = new Subject<string>();

  private currentUser: User | null = null;
  private currentUserSub: Subscription = new Subscription;

  private APIEndpoint = 'https://babytracker5000-default-rtdb.firebaseio.com/notes.json';
  // private _APIEndpoint = 'https://babytracker5000-default-rtdb.firebaseio.com/notes';

  constructor(
    private http: HttpClient,
    private notesService: NotesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.currentUserSub = this.authService.user.subscribe( user => {
    //   this.currentUser = user;
    //   if( user ){
    //     console.log('update APIEndpoint');
    //     this.APIEndpoint = `https://babytracker5000-default-rtdb.firebaseio.com/notes/${user.id}.json`;
    //   }

    // });
  }

  storeNotes(){
    console.log('About to store notes...');
    const notes = this.notesService.getNotes();
    // console.log(notes);

    // const notesForStorage = this.authService.user.pipe(
    //   take(1),
    //   map( user => {
    //     if( user ){
    //       return {
    //         id: user.id,
    //         notes: notes
    //       };
    //     } else {
    //       return null;
    //     }
    //   })
    // );

    try {
      // LocalStorage method
      // localStorage.setItem('notes', JSON.stringify(notes));

      // Remote method
      const user = this.authService.user.getValue();
      let storeEndpoint = 'https://babytracker5000-default-rtdb.firebaseio.com/notes';
      if (user && user?.id) {
        storeEndpoint += '/' + user?.id + '.json';
      }

      if (notes) {
        this.http
        .put(
          storeEndpoint,
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
      }

    } catch (error) {
      console.error('Error fetching notes: ', error);
    }


  }

  // get APIEndpoint(): string{
  //   let returnedAPIEndpoint = this.APIEndpoint;

  //   // const user = this.authService.user.pipe(
  //   //   take(1),
  //   //   map( user => {
  //   //     returnedAPIEndpoint += '/' + user?.id;
  //   //     return user;
  //   //   })
  //   // );

  //   // this.authService.user.subscribe( user => {
  //   //   returnedAPIEndpoint += '/' + user?.id;
  //   // }).unsubscribe();

  //   // const user = this.authService.user;
  //   // console.log('APIEndpoint user = ', user);

  //   if( this.currentUser ){
  //     returnedAPIEndpoint += '/' + this.currentUser.id;
  //   }

  //   return returnedAPIEndpoint;
  // }

  fetchNotes() {
    console.log('start fetch');
    // console.log( this.APIEndpoint );

    // LocalStorage method
    // const notes:Note[] = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes') || '{}') : [];
    // if (notes) {
    //   this.notesService.setNotes(notes);
    // }

    // return notes;

    // Remote method
    const user = this.authService.user.getValue();
    let fetchEndpoint = 'https://babytracker5000-default-rtdb.firebaseio.com/notes';
    if( user && user?.id ){
      fetchEndpoint += '/' + user?.id + '.json';
    }
    console.log('fetchEndpoint = ', fetchEndpoint);
    return this.http.get<object>(fetchEndpoint)
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

  ngOnDestroy(): void {
    // this.currentUserSub.unsubscribe();
  }

}
