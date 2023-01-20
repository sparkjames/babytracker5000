import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';
// import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class NoteStorageService {

  private APIEndpoint = 'https://babytracker5000-default-rtdb.firebaseio.com/notes.json';

  // constructor(
  //   private http: HttpClient,
  //   private notesService: NotesService
  // ) {}
  constructor( private notesService: NotesService ){

  }

  storeNotes(){
    console.log('About to store notes...');
    const notes = this.notesService.getNotes();

    // this.http
    //   .put(
    //     this.APIEndpoint,
    //     notes
    //   )
    //   .subscribe(response => {
    //     console.log(response);
    //   });
  }

  fetchNotes(){

  }

}
