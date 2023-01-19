import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Note } from "../note.model";

@Injectable()
export class NotesListService {
  notesChanged = new Subject<Note[]>();

  private notes: Note[] = [
    new Note(
      'feeding',
      'Applesauce',
      '25min'
    ),
    new Note(
      'wet + poop',
      'small poop'
    ),
    new Note(
      'nap',
      '1st nap of day',
      '2hr'
    )
  ];

  constructor(){

  }

  // setNotes(notes: Note[]){

  // }

  getNotes(){
    return this.notes.slice();
  }

  getNote( index:number ){
    return this.notes[index];
  }

  addNote( note: Note ){
    this.notes.push( note );
    this.notesChanged.next( this.notes.slice() );
  }

}