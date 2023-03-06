import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Note } from './note.model';
import { BehaviorSubject, catchError, map, tap } from 'rxjs';

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
    console.log('About to store notes...');
    const notes = this.notesService.getNotes();
    console.log(notes);

    this.isStoring.next(true);

    try {
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
      console.log('Error fetching notes: ', error);
      this.isStoring.next(false);
    }


  }

  fetchNotes() {
    console.log('start fetch');
    this.isFetching.next(true);
    return this.http
      .get<Note[]>(this.APIEndpoint)
      .pipe(
        map( notes => {
          console.log(notes);
          return notes.map( note => {
            return {
              ...note,
              feedDetails: note.feedDetails ? note.feedDetails : '',
              diaperDetails: note.diaperDetails ? note.diaperDetails : ''
            }
          })
        }),
        tap( notes => {
          if( notes ){
            this.notesService.setNotes(notes);
          }
          this.isFetching.next(false);
          console.log('finished fetch');
          console.log(notes);
        }),
        catchError((error, caught) => {
          console.log('Error in fetching note list: ', error);
          // console.log(caught);
          this.isFetching.next(false);
          return [];
        })
      );
  }

}
