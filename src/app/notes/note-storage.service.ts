import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Note } from './note.model';
import { map, tap } from 'rxjs';

@Injectable()
export class NoteStorageService {

  private APIEndpoint = 'https://babytracker5000-default-rtdb.firebaseio.com/notes.json';

  constructor(
    private http: HttpClient,
    private notesService: NotesService
  ) {}
  // constructor( private notesService: NotesService){}

  storeNotes(){
    console.log('About to store notes...');
    const notes = this.notesService.getNotes();
    console.log(notes);

    this.http
      .put(
        this.APIEndpoint,
        notes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchNotes() {
    // console.log('start fetch');
    return this.http
      .get<Note[]>(this.APIEndpoint)
      .pipe(
        tap(notes => {
          this.notesService.setNotes(notes);
          console.log('finished fetch');
          console.log(notes);
        })
      );
  }

}
