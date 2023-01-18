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
      new Date("2023-01-01"),
      new Date()
    ),
    new Note(
      'wet + poop',
      'small poop',
      new Date(),
      new Date()
    ),
    new Note(
      'nap',
      '1st nap of day',
      new Date('January 17, 2023 10:15:00'),
      new Date('January 17, 2023 11:00:00')
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