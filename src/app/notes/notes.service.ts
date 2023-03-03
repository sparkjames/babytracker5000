import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { Note } from "./note.model";

@Injectable()
export class NotesService {
  notesChanged = new Subject<Note[]>();
  editNote = new BehaviorSubject<number>(-1);

  private notes: Note[] = [
    // new Note(
    //   'Feeding',
    //   'Applesauce',
    //   '25min'
    // ),
    // new Note(
    //   'Diaper',
    //   'small poop'
    // ),
    // new Note(
    //   'Sleep',
    //   '1st nap of day',
    //   '2hr'
    // )
  ];

  setNotes(notes: Note[]){
    this.notes = notes;
    this.notesChanged.next( this.notes.slice() );
  }

  getNotes(){
    return this.notes ? this.notes.slice() : [];
  }

  getNote( index:number ){
    return this.notes[index];
  }

  addNote( note: Note ){
    this.notes.push( note );
    this.notesChanged.next( this.notes.slice() );
  }

  deleteNote( index: number ){
    this.notes.splice(index, 1);
    this.notesChanged.next( this.notes.slice() );
  }

}